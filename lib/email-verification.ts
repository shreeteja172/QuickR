export const getVerificationEmail = (otp:string) => ({
  html: `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <title>Verify Your QuickR Account</title>
    </head>
    <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #ffffff;">
      <table role="presentation" style="width: 100%; border-collapse: collapse; background-color: #ffffff;">
        <tr>
          <td align="center" style="padding: 40px 20px;">
            <table role="presentation" style="width: 100%; max-width: 600px; border-collapse: collapse; background-color: #ffffff; border: 1px solid #e5e5e5; border-radius: 8px;">
              
              <!-- Header -->
              <tr>
                <td style="padding: 48px 48px 32px; text-align: center; border-bottom: 1px solid #e5e5e5;">
                  <div style="width: 48px; height: 48px; margin: 0 auto 20px; background-color: #000000; border-radius: 8px; display: inline-flex; align-items: center; justify-content: center;">
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <rect x="3" y="3" width="7" height="7" fill="white"/>
                      <rect x="14" y="3" width="7" height="7" fill="white"/>
                      <rect x="3" y="14" width="7" height="7" fill="white"/>
                      <rect x="16" y="16" width="2" height="2" fill="white"/>
                      <rect x="14" y="14" width="2" height="2" fill="white"/>
                      <rect x="18" y="14" width="2" height="2" fill="white"/>
                    </svg>
                  </div>
                  <h1 style="margin: 0; font-size: 24px; font-weight: 600; color: #000000; letter-spacing: -0.5px;">
                    QuickR
                  </h1>
                </td>
              </tr>
              
              <!-- Body -->
              <tr>
                <td style="padding: 40px 48px 32px;">
                  <h2 style="margin: 0 0 16px; font-size: 20px; font-weight: 600; color: #000000;">
                    Verify your email
                  </h2>
                  <p style="margin: 0 0 24px; font-size: 15px; line-height: 1.6; color: #404040;">
                    Thanks for signing up for QuickR! Use the verification code below to complete your registration and start creating dynamic QR codes.
                  </p>
                  
                  <!-- OTP Code -->
                  <table role="presentation" style="width: 100%; border-collapse: collapse; margin: 32px 0;">
                    <tr>
                      <td style="text-align: center;">
                        <div style="display: inline-block; background-color: #f5f5f5; border: 2px solid #000000; border-radius: 8px; padding: 20px 40px;">
                          <div style="font-size: 36px; font-weight: 700; letter-spacing: 10px; color: #000000; font-family: 'Courier New', monospace;">
                            ${otp}
                          </div>
                        </div>
                      </td>
                    </tr>
                  </table>
                  
                  <p style="margin: 24px 0 0; font-size: 14px; line-height: 1.6; color: #737373; text-align: center;">
                    This code expires in <strong style="color: #000000;">10 minutes</strong>
                  </p>
                </td>
              </tr>
              
              <!-- Security Notice -->
              <tr>
                <td style="padding: 0 48px 32px;">
                  <div style="background-color: #fafafa; border: 1px solid #e5e5e5; border-radius: 6px; padding: 16px 20px;">
                    <p style="margin: 0; font-size: 13px; line-height: 1.5; color: #404040;">
                      <strong style="color: #000000;">Security reminder:</strong> Never share this code with anyone. QuickR will never ask for your verification code.
                    </p>
                  </div>
                </td>
              </tr>
              
              <!-- Footer -->
              <tr>
                <td style="padding: 32px 48px 48px; border-top: 1px solid #e5e5e5;">
                  <p style="margin: 0 0 8px; font-size: 13px; line-height: 1.5; color: #737373;">
                    Didn't request this code? You can safely ignore this email.
                  </p>
                  <p style="margin: 0; font-size: 13px; line-height: 1.5; color: #737373;">
                    Need help? Contact us at <a href="mailto:support@quickr.com" style="color: #000000; text-decoration: underline;">support@quickr.com</a>
                  </p>
                </td>
              </tr>
              
            </table>
            
            <!-- Footer Text -->
            <table role="presentation" style="width: 100%; max-width: 600px; border-collapse: collapse; margin-top: 32px;">
              <tr>
                <td style="text-align: center; padding: 0 20px;">
                  <p style="margin: 0 0 8px; font-size: 12px; line-height: 1.5; color: #a3a3a3;">
                    © ${new Date().getFullYear()} QuickR. All rights reserved.
                  </p>
                  <p style="margin: 0; font-size: 12px; line-height: 1.5; color: #a3a3a3;">
                    Dynamic QR codes made simple.
                  </p>
                </td>
              </tr>
            </table>
            
          </td>
        </tr>
      </table>
    </body>
    </html>
  `,
  text: `
QuickR - Verify your email

Thanks for signing up for QuickR! Use the verification code below to complete your registration and start creating dynamic QR codes.

Verification Code: ${otp}

This code expires in 10 minutes.

Security reminder: Never share this code with anyone. QuickR will never ask for your verification code.

Didn't request this code? You can safely ignore this email.

Need help? Contact us at support@quickr.com

© ${new Date().getFullYear()} QuickR. All rights reserved.
Dynamic QR codes made simple.
  `.trim()
});