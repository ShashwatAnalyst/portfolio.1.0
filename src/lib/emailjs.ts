import emailjs from '@emailjs/browser';

// Initialize EmailJS with your public key
emailjs.init("vCsyJWyCmsvXkcs3I");

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
            "service_sqpjye1",
            "template_hm0puep",
            templateParams
        );

        return { success: true, data: response };
    } catch (error) {
        console.error('EmailJS error:', error);
        return { success: false, error };
    }
}; 