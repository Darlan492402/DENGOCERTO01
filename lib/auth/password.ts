/**
 * Password Hashing Utility
 * Handles secure password hashing and verification using bcrypt
 */

import bcrypt from "bcryptjs"

const SALT_ROUNDS = 10

/**
 * Password management class for secure hashing and verification
 */
export class PasswordManager {
  /**
   * Hash a plain text password
   */
  static async hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, SALT_ROUNDS)
  }

  /**
   * Verify a password against its hash
   */
  static async verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
    return await bcrypt.compare(password, hashedPassword)
  }

  /**
   * Validate password strength
   * Minimum 8 characters, at least one letter and one number
   */
  static validatePasswordStrength(password: string): {
    valid: boolean
    message?: string
  } {
    if (password.length < 8) {
      return {
        valid: false,
        message: "A senha deve ter no mínimo 8 caracteres",
      }
    }

    const hasLetter = /[a-zA-Z]/.test(password)
    const hasNumber = /[0-9]/.test(password)

    if (!hasLetter || !hasNumber) {
      return {
        valid: false,
        message: "A senha deve conter letras e números",
      }
    }

    return { valid: true }
  }
}

export const hashPassword = PasswordManager.hashPassword
export const verifyPassword = PasswordManager.verifyPassword
export const validatePasswordStrength = PasswordManager.validatePasswordStrength
