class NotificationService:
    @staticmethod
    def send_farmer_alert(phone_number: str, message: str) -> dict:
        return {
            "status": "Success",
            "recipient": phone_number,
            "channel": "SMS & WhatsApp Push",
            "message": message
        }
