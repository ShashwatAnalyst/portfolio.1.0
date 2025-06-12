import emailjs from '@emailjs/browser';

// Initialize EmailJS with your public key
emailjs.init(import.meta.env.EMAILJS_PUBLIC_KEY);

export const sendEmail = async (formData: {
    name: string;
    email: string;
    subject: string;
    message: string;
}) => {
    try {
        const templateParams = {
            from_name: formData.name,
            from_email: formData.email,
            subject: formData.subject,
            message: formData.message,
        };

        const response = await emailjs.send(
            import.meta.env.EMAILJS_SERVICE_ID,
            import.meta.env.EMAILJS_TEMPLATE_ID,
            templateParams
        );

        return { success: true, data: response };
    } catch (error) {
        console.error('EmailJS error:', error);
        return { success: false, error };
    }
}; 