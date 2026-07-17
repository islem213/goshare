// js/supabase-config.js

// Prevent redeclaration errors
if (typeof supabaseClient === 'undefined') {
    const SUPABASE_URL = 'https://oeuwnqcogjeoynsxanjg.supabase.co';
    const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9ldXducWNvZ2plb3luc3hhbmpnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzAwMzc1NTgsImV4cCI6MjA4NTYxMzU1OH0.NHawH5upc28aN661ry69VIAmpNLly5oixQjYDSeNPSw';
    
    // Use a unique name like 'supabaseClient' instead of just 'supabase'
    window.supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
}

async function checkAuth() {
    const { data: { user }, error } = await window.supabaseClient.auth.getUser();
    const path = window.location.pathname.toLowerCase(); // Convert to lowercase for safety

    // The logic: IF no user AND we are NOT on login or register, THEN redirect.
    const isAuthPage = path.includes('login.html') || path.includes('register.html') || path.includes('login') || path.includes('register');

    if (!user && !isAuthPage) {
        window.location.href = 'login.html';
        return null;
    }

    // Update UI if user is found
    const userDisplay = document.getElementById('userDropdownSpan');
    if (userDisplay && user) {
        userDisplay.textContent = user.email;
    }
    return user;
}

async function logout() {
    await supabaseClient.auth.signOut();
    window.location.href = 'login.html';
}

checkAuth();

// Sidebar Toggling Logic
document.addEventListener('DOMContentLoaded', function() {
    const sidebarToggle = document.getElementById('sidebarToggleTop');
    if (sidebarToggle) {
        sidebarToggle.addEventListener('click', function(e) {
            document.body.classList.toggle('sidebar-toggled');
            document.querySelector('.sidebar').classList.toggle('toggled');
        });
    }
});