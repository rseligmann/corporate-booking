/*const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000/api'

//async function handleApiError(error: unknown, context: string) {
  console.error(`Error in ${context}:`, error)
  if (error instanceof Error) {
    console.error('Error message:', error.message)
    console.error('Error stack:', error.stack)
    return new Error(`${context}: ${error.message}`)
  }
  return new Error(`An unknown error occurred in ${context}`)
}

export const fetchTrips = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/trips`)
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    return await response.json()
  } catch (error) {
    throw await handleApiError(error, 'fetchTrips')
  }
}

//export const createGuestInvite = async (inviteData: any) => {
  try {
    const response = await fetch(`${API_BASE_URL}/guest-invite`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(inviteData),
    })
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    return await response.json()
  } catch (error) {
    throw await handleApiError(error, 'createGuestInvite')
  }
}

export const checkApiConnection = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/health`)
    if (!response.ok) {
      throw new Error(`API health check failed. Status: ${response.status}`)
    }
    return await response.json()
  } catch (error) {
    throw await handleApiError(error, 'checkApiConnection')
  }
}

// Add more API functions as needed */