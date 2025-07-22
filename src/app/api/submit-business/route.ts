import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { promises as fs } from 'fs';
import path from 'path';

// Function to save business submission to JSON file
async function saveSubmissionToFile(data: any) {
  try {
    // Create a data object with timestamp
    const submissionData = {
      ...data,
      submissionDate: new Date().toISOString(),
      id: `business-${Date.now()}`
    };

    // Path to the business submissions JSON file
    const dataDirectory = path.join(process.cwd(), 'data');
    const filePath = path.join(dataDirectory, 'business-submissions.json');
    
    // Check if the file exists, create it if it doesn't
    let submissions = [];
    try {
      const fileContent = await fs.readFile(filePath, 'utf8');
      submissions = JSON.parse(fileContent);
      
      // Make sure it's an array
      if (!Array.isArray(submissions)) {
        submissions = [];
      }
    } catch (error) {
      // File doesn't exist or has invalid JSON, create a new array
      console.log('Creating new business submissions file');
    }
    
    // Add new submission
    submissions.push(submissionData);
    
    // Write back to file
    await fs.writeFile(filePath, JSON.stringify(submissions, null, 2), 'utf8');
    
    console.log(`Business submission saved to file with ID: ${submissionData.id}`);
    return true;
  } catch (error) {
    console.error('Error saving submission to file:', error);
    return false;
  }
}

// Function to verify email credentials
async function verifyEmailCredentials() {
  try {
    const emailUser = process.env.EMAIL_USER;
    const emailPass = process.env.EMAIL_PASS;

    if (!emailUser || !emailPass) {
      throw new Error('Email credentials are not configured in environment variables');
    }

    // Create a transporter with the credentials
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: emailUser,
        pass: emailPass,
      },
    });

    // Verify the connection and authentication
    await transporter.verify();
    console.log('Email credentials verified successfully');
    return { success: true, transporter };
  } catch (error) {
    console.error('Email authentication failed:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown email authentication error'
    };
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    
    // Log the received data for debugging
    console.log('Received form submission:', data);

    // Save the submission to a JSON file
    const savedToFile = await saveSubmissionToFile(data);
    if (!savedToFile) {
      console.warn('Failed to save submission to file, but will still attempt to send email');
    }
    
    // First verify email credentials
    const authResult = await verifyEmailCredentials();

    if (!authResult.success) {
      return NextResponse.json(
        {
          success: false,
          message: `Email authentication failed: ${authResult.error}`
        },
        { status: 401 }
      );
    }

    // Use the authenticated transporter
    const transporter = authResult.transporter;

    // Recipient email - use environment variable or fallback to default
    const recipientEmail = process.env.RECIPIENT_EMAIL || 'cva.thapa1@gmail.com';

    console.log('Sending email to:', recipientEmail);

    // Prepare email content
    const mailOptions = {
      from: process.env.EMAIL_USER || 'tripnosis.app@gmail.com',
      to: recipientEmail,
      subject: `New Business Submission: ${data.businessName}`,
      html: `
        <h1>New Business Submission</h1>
        <h2>${data.businessName}</h2>
        
        <h3>Business Information</h3>
        <p><strong>Type:</strong> ${data.businessType}</p>
        <p><strong>Description:</strong> ${data.description}</p>
        
        <h3>Location</h3>
        <p><strong>Address:</strong> ${data.address}</p>
        <p><strong>Suburb:</strong> ${data.suburb}</p>
        <p><strong>Postcode:</strong> ${data.postcode}</p>
        
        <h3>Contact Details</h3>
        <p><strong>Contact Person:</strong> ${data.contactName}</p>
        <p><strong>Email:</strong> ${data.contactEmail}</p>
        <p><strong>Phone:</strong> ${data.contactPhone}</p>
        
        <h3>Promotion Details</h3>
        <p>${data.promotion}</p>
        
        <h3>Online Presence</h3>
        <p><strong>Website:</strong> ${data.website || 'Not provided'}</p>
        <p><strong>Social Media:</strong> ${data.socialMedia || 'Not provided'}</p>
        
        <p><em>Submission received on ${new Date().toLocaleString()}</em></p>
      `,
    };

    // For development/testing, log the email content and return success
    // This prevents email sending errors during development
    if (process.env.NODE_ENV === 'development') {
      console.log('Email would be sent with:', mailOptions);
      return NextResponse.json({ 
        success: true, 
        message: 'Development mode: Email would be sent in production',
        savedToFile,
        submissionId: `business-${Date.now()}`
      });
    }

    // Send email in production
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.response);

    return NextResponse.json({ 
      success: true, 
      message: 'Business details sent successfully and saved to file',
      savedToFile
    });
  } catch (error) {
    console.error('Error processing submission:', error);
    return NextResponse.json(
      { success: false, message: `Failed to process business details: ${error instanceof Error ? error.message : 'Unknown error'}` },
      { status: 500 }
    );
  }
}
