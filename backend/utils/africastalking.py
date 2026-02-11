# 
import africastalking
from django.conf import settings

# Initialize Africa's Talking
africastalking.initialize(
    settings.AFRICASTALKING_USERNAME,
    settings.AFRICASTALKING_API_KEY
)

sms = africastalking.SMS

def send_sms(to, message):
    """
    Sends an SMS and gracefully handles blacklist and other errors.
    'to' must be a string with E.164 format, e.g., '+254791454535'
    """
    try:
        response = sms.send(message, [to])
        recipients = response.get("SMSMessageData", {}).get("Recipients", [])

        for recipient in recipients:
            status = recipient.get("status")
            number = recipient.get("number")
            
            if status == "Success":
                print(f"SMS successfully sent to {number}")
            elif status == "UserInBlacklist":
                print(f"Cannot send SMS to {number}: Number is blacklisted.")
            else:
                print(f"Failed to send SMS to {number}: {status}")

        return response

    except Exception as e:
        print("Error sending SMS:", e)
        return None
