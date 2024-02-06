import React, { FC } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from 'react-query'
import { Layout } from './components/Layout'

export const App: FC = () => {
  const queryClient = new QueryClient()
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  )
}