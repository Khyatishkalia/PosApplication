import React from 'react'
function Logout() {
    localStorage.clear();
    window.location.href="/login";
  
}

export default Logout;