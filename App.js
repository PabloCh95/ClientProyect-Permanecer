import React, { useEffect } from 'react';
import Navigation from "./src/Navigations/Navigation";//importamos navigation
import AuthProvider from './src/provider/AuthProvider';


export default function App() {

  return (
    <AuthProvider>
      <Navigation />
    </AuthProvider>
  );
}
