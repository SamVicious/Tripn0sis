import { NextResponse } from 'next/server';

// Define the interface for Opal data
interface OpalData {
  balance: number;
  weeklySpend: number;
  weeklyCapReached: boolean;
  dailySpend: number;
  dailyCapReached: boolean;
  lastTrip: string;
  suggestedTopUp: number;
  savings: number;
  cardNumber?: string;
  lastUpdated?: string;
}

// Define the interface for transport alerts
interface TransportAlert {
  id: string;
  type: 'savings' | 'warning' | 'info';
  title: string;
  message: string;
  action?: string;
}

export async function GET(request: Request) {
  try {
    // Get Opal card number from query parameters
    const { searchParams } = new URL(request.url);
    const cardNumber = searchParams.get('cardNumber');

    // Get API key from environment variables
    const apiKey = process.env.TRANSPORT_NSW_API_KEY;

    if (!apiKey) {
      console.warn('Transport NSW API key is not configured');
      return NextResponse.json({ error: 'API key not configured' }, { status: 500 });
    }

    let opalData: OpalData;
    let alerts: TransportAlert[] = [];

    try {
      // If card number is provided, fetch data from the real Opal API
      if (cardNumber) {
        // Example of using the real Opal API
        const response = await fetch(`https://api.transport.nsw.gov.au/v1/opal/card-details?cardNumber=${cardNumber}`, {
          headers: {
            'Authorization': `apikey ${apiKey}`,
            'Accept': 'application/json'
          }
        });

        if (!response.ok) {
          throw new Error(`Transport NSW API responded with status: ${response.status}`);
        }

        const data = await response.json();

        // Transform the real API response to our OpalData format
        opalData = {
          balance: data.balance || 0,
          weeklySpend: data.weeklySpend || 0,
          weeklyCapReached: data.weeklySpend >= 50, // $50 is the weekly cap
          dailySpend: data.dailySpend || 0,
          dailyCapReached: data.dailySpend >= 16.10, // $16.10 is the daily cap
          lastTrip: data.lastTransaction?.description || "No recent trips",
          suggestedTopUp: data.balance < 10 ? 25 : 0,
          savings: data.savings || 0,
          cardNumber: data.cardNumber,
          lastUpdated: new Date().toISOString()
        };

        // Generate smart alerts based on the data
        if (opalData.balance < 10) {
          alerts.push({
            id: 'low-balance',
            type: 'warning',
            title: 'Low Balance Warning',
            message: `Your balance is $${opalData.balance.toFixed(2)}. Top up $25 to avoid being caught short.`,
            action: 'Top up now'
          });
        }

        if (opalData.weeklySpend > 40 && !opalData.weeklyCapReached) {
          alerts.push({
            id: 'near-weekly-cap',
            type: 'savings',
            title: 'Weekly Cap Alert',
            message: `You're $${(50 - opalData.weeklySpend).toFixed(2)} away from hitting your weekly travel cap! Take more trips this week to maximize value.`,
            action: 'Plan more trips'
          });
        }

        const today = new Date();
        if (today.getDay() === 0) { // Sunday
          alerts.push({
            id: 'sunday-cap',
            type: 'info',
            title: 'Sunday Funday',
            message: 'Remember: $2.80 daily cap on Sundays after 8am. Perfect for exploring!',
          });
        }
      } else {
        // Use fallback data if no card number is provided
        opalData = {
          balance: 23.45,
          weeklySpend: 47.80,
          weeklyCapReached: false,
          dailySpend: 8.20,
          dailyCapReached: false,
          lastTrip: "Central to Circular Quay",
          suggestedTopUp: 25.00,
          savings: 12.30,
          lastUpdated: new Date().toISOString()
        };

        alerts = [
          {
            id: '1',
            type: 'savings',
            title: 'Weekly Cap Alert',
            message: 'You\'re $2.20 away from hitting your weekly travel cap! Take more trips this week to maximize value.',
            action: 'Plan more trips'
          },
          {
            id: '2',
            type: 'info',
            title: 'Sunday Funday',
            message: 'Remember: $2.80 daily cap on Sundays after 8am. Perfect for exploring!',
          },
          {
            id: '3',
            type: 'warning',
            title: 'Low Balance Warning',
            message: 'Your balance is getting low. Top up $25 to avoid being caught short.',
            action: 'Top up now'
          }
        ];
      }

      return NextResponse.json({
        success: true,
        opalData,
        alerts
      });

    } catch (apiError) {
      console.error('Error fetching from Transport NSW API:', apiError);

      // Fallback to demo data if the real API fails
      return NextResponse.json({
        success: false,
        error: 'Could not connect to Transport NSW API',
        opalData: {
          balance: 23.45,
          weeklySpend: 47.80,
          weeklyCapReached: false,
          dailySpend: 8.20,
          dailyCapReached: false,
          lastTrip: "Central to Circular Quay",
          suggestedTopUp: 25.00,
          savings: 12.30,
          lastUpdated: new Date().toISOString()
        },
        alerts: [
          {
            id: '1',
            type: 'warning',
            title: 'API Connection Error',
            message: 'We couldn\'t connect to the Transport NSW API. Showing demo data instead.',
          },
          {
            id: '2',
            type: 'info',
            title: 'Sunday Funday',
            message: 'Remember: $2.80 daily cap on Sundays after 8am. Perfect for exploring!',
          }
        ]
      });
    }

  } catch (error) {
    console.error('Error in Opal API route:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to process request' },
      { status: 500 }
    );
  }
}
