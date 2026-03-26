import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchGreetings, createGreeting, deleteGreeting } from '../lib/api';

export function useGreetings() {
  return useQuery({
    queryKey: ['greetings'],
    queryFn: fetchGreetings,
  });
}

export function useCreateGreeting() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (message: string) => createGreeting(message),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['greetings'] });
    },
  });
}

export function useDeleteGreeting() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => deleteGreeting(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['greetings'] });
    },
  });
}
