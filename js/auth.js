// ===== AUTHENTICATION MANAGER =====
// Handles user registration, login, logout, and session management using localStorage

class AuthManager {
    constructor() {
        this.usersKey = 'bluewave_users';
        this.sessionKey = 'bluewave_current_user';
    }

    // ===== USER REGISTRATION =====
    register(userData) {
        const { email, password, firstName, lastName, phone } = userData;

        // Validate email format
        if (!this.validateEmail(email)) {
            return { success: false, message: 'Please enter a valid email address.' };
        }

        // Validate password strength
        const passwordValidation = this.validatePassword(password);
        if (!passwordValidation.valid) {
            return { success: false, message: passwordValidation.message };
        }

        // Check if email already exists
        if (!this.isEmailUnique(email)) {
            return { success: false, message: 'This email is already registered. Please login instead.' };
        }

        // Get existing users
        const users = this.getAllUsers();

        // Create new user object
        const newUser = {
            id: this.generateUserId(),
            email: email.toLowerCase().trim(),
            password: this.hashPassword(password),
            firstName: firstName || '',
            lastName: lastName || '',
            phone: phone || '',
            createdAt: new Date().toISOString(),
            lastLogin: null
        };

        // Add user to array
        users.push(newUser);

        // Save to localStorage
        try {
            localStorage.setItem(this.usersKey, JSON.stringify(users));
            return { success: true, message: 'Registration successful! Please login.', user: newUser };
        } catch (error) {
            return { success: false, message: 'Failed to save user data. Please try again.' };
        }
    }

    // ===== USER LOGIN =====
    login(email, password) {
        if (!email || !password) {
            return { success: false, message: 'Please enter both email and password.' };
        }

        // Validate email format
        if (!this.validateEmail(email)) {
            return { success: false, message: 'Please enter a valid email address.' };
        }

        // Get all users
        const users = this.getAllUsers();
        const normalizedEmail = email.toLowerCase().trim();
        const hashedPassword = this.hashPassword(password);

        // Find user by email
        const user = users.find(u => u.email === normalizedEmail);

        if (!user) {
            return { success: false, message: 'Invalid email or password.' };
        }

        // Verify password
        if (user.password !== hashedPassword) {
            return { success: false, message: 'Invalid email or password.' };
        }

        // Update last login
        user.lastLogin = new Date().toISOString();
        const userIndex = users.findIndex(u => u.id === user.id);
        if (userIndex !== -1) {
            users[userIndex] = user;
            localStorage.setItem(this.usersKey, JSON.stringify(users));
        }

        // Create session (without password)
        const sessionUser = {
            id: user.id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            phone: user.phone,
            loginTime: new Date().toISOString()
        };

        try {
            localStorage.setItem(this.sessionKey, JSON.stringify(sessionUser));
            return { success: true, message: 'Login successful!', user: sessionUser };
        } catch (error) {
            return { success: false, message: 'Failed to create session. Please try again.' };
        }
    }

    // ===== USER LOGOUT =====
    logout() {
        try {
            localStorage.removeItem(this.sessionKey);
            return { success: true, message: 'Logged out successfully.' };
        } catch (error) {
            return { success: false, message: 'Failed to logout. Please try again.' };
        }
    }

    // ===== GET CURRENT USER =====
    getCurrentUser() {
        try {
            const userStr = localStorage.getItem(this.sessionKey);
            if (!userStr) return null;
            return JSON.parse(userStr);
        } catch (error) {
            return null;
        }
    }

    // ===== CHECK IF AUTHENTICATED =====
    isAuthenticated() {
        return this.getCurrentUser() !== null;
    }

    // ===== GET ALL USERS (for internal use) =====
    getAllUsers() {
        try {
            const usersStr = localStorage.getItem(this.usersKey);
            return usersStr ? JSON.parse(usersStr) : [];
        } catch (error) {
            return [];
        }
    }

    // ===== VALIDATION METHODS =====
    validateEmail(email) {
        if (!email || typeof email !== 'string') return false;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
        return emailRegex.test(email.trim());
    }

    validatePassword(password) {
        if (!password || typeof password !== 'string') {
            return { valid: false, message: 'Password is required.' };
        }

        if (password.length < 8) {
            return { valid: false, message: 'Password must be at least 8 characters long.' };
        }

        if (!/[A-Z]/.test(password)) {
            return { valid: false, message: 'Password must contain at least one uppercase letter.' };
        }

        if (!/[a-z]/.test(password)) {
            return { valid: false, message: 'Password must contain at least one lowercase letter.' };
        }

        if (!/[0-9]/.test(password)) {
            return { valid: false, message: 'Password must contain at least one number.' };
        }

        return { valid: true, message: 'Password is valid.' };
    }

    isEmailUnique(email) {
        const users = this.getAllUsers();
        const normalizedEmail = email.toLowerCase().trim();
        return !users.some(u => u.email === normalizedEmail);
    }

    // ===== UTILITY METHODS =====
    hashPassword(password) {
        // Simple hash function for demo purposes (NOT secure for production)
        // In production, use proper hashing like bcrypt
        let hash = 0;
        for (let i = 0; i < password.length; i++) {
            const char = password.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash; // Convert to 32-bit integer
        }
        return Math.abs(hash).toString(16);
    }

    generateUserId() {
        return 'user_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    }
}

// ===== INITIALIZE AUTH MANAGER =====
const authManager = new AuthManager();

// Make it globally available
window.authManager = authManager;

