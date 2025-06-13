import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { sendEmail } from '../lib/emailjs';
import { toast } from 'sonner';
import { useUltraSmoothScroll } from '@/hooks/UltraSmoothScroll';
import { Label } from './ui/label';

export function ContactSection() {
  const { addSection } = useUltraSmoothScroll();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const result = await sendEmail(formData);
      if (result.success) {
        toast.success('Message sent successfully!');
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: ''
        });
      } else {
        toast.error('Failed to send message. Please try again.');
      }
    } catch (error) {
      toast.error('An error occurred. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section ref={addSection} id="contact" className="px-4">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl heading-font font-normal mb-4 text-foreground">GET IN TOUCH</h2>
          <p className="text-muted-foreground text-[18.5px] text-lg max-w-2xl mx-auto">
            Ready to collaborate on your next data project? Let's discuss how data-driven insights can transform your business. Fill out the form below and I'll get back to you within 24 hours.
          </p>
        </div>

        <div className="flex justify-center">
          <div className="w-full max-w-5xl">
            <div className="bg-card rounded-lg shadow-lg border border-border">
              <div className="p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-foreground">Name</Label>
                      <Input
                        id="name"
                        name="name"
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="h-12 bg-background border-input"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-foreground">Email</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="john.doe@example.com"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="h-12 bg-background border-input"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="subject" className="text-foreground">Subject</Label>
                    <Input
                      id="subject"
                      name="subject"
                      placeholder="Project Discussion"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="h-12 bg-background border-input"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="message" className="text-foreground">Message</Label>
                    <Textarea
                      id="message"
                      name="message"
                      placeholder="Tell me about your project requirements..."
                      value={formData.message}
                      onChange={handleChange}
                      required
                      className="min-h-[200px] bg-background border-input"
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full h-12 bg-primary text-primary-foreground hover:bg-primary/90 text-lg"
                    disabled={isLoading}
                  >
                    {isLoading ? 'Sending...' : 'Send Message'}
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-16 pt-8 border-t border-border text-center">
          <p className="text-muted-foreground text-sm">
            © 2025 Data Analyst Portfolio. Built with React, TypeScript, Vite, Tailwind CSS, GSAP, shadcn/ui, and ☕ by Shashwat Singh.
          </p>
        </div>
      </div>
    </section>
  );
}