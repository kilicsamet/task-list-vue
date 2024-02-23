import axios from 'axios';

interface Task {
  id: string;
  occurrence: string;
  time: string;
  priority: number;
  title: string;
  description: string;
  isCompleted: boolean;
  lastCompletedEvent: [];
  responsibleUsers:[];
  events: [];
  tenants:[];
}

export async function getTasks(): Promise<Task[]> {
  try {
    const response = await axios.get('https://jobs.tipiteq.com/dummy_data.json');
    return response.data.data as Task[];
  } catch (error) {
    console.error('Error fetching tasks:', error);
    throw error; 
  }
}
