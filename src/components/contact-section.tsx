import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { sendEmail } from '../lib/emailjs';
import { toast } from 'sonner';
import { useUltraSmoothScroll } from '../hooks/UltraSmoothScroll';
import { Label } from './ui/label';
import { useEffect } from 'react';

export function ContactSection() {
  const { addSection } = useUltraSmoothScroll();
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsSmallScreen(window.innerWidth < 450);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

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
    } catch {
      toast.error('An error occurred. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section ref={addSection} id="contact" className="px-4">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className={`${isSmallScreen ? 'text-2xl md:text-3xl' : 'text-3xl md:text-4xl'} heading-font font-normal mb-4 text-foreground`}>GET IN TOUCH</h2>
          <p className={`${isSmallScreen ? 'text-xs md:text-sm' : 'text-lg'} text-muted-foreground ${isSmallScreen ? 'text-[12px]' : 'text-[18.5px]'} max-w-2xl mx-auto`}>
  Feel free to reach out, I’ll get back to you shortly.
</p>

        </div>

        <div className="flex justify-center">
          <div className="w-full max-w-5xl">
            <div className="bg-card rounded-lg shadow-lg border border-border">
              <div className={`${isSmallScreen ? 'p-4' : 'p-8'}`}>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name" className={`${isSmallScreen ? 'text-xs' : 'text-base'} text-foreground`}>Name</Label>
                      <Input
                        id="name"
                        name="name"
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className={`${isSmallScreen ? 'h-10 text-xs' : 'h-12'} bg-background border-input`}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email" className={`${isSmallScreen ? 'text-xs' : 'text-base'} text-foreground`}>Email</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="john.doe@example.com"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className={`${isSmallScreen ? 'h-10 text-xs' : 'h-12'} bg-background border-input`}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="subject" className={`${isSmallScreen ? 'text-xs' : 'text-base'} text-foreground`}>Subject</Label>
                    <Input
                      id="subject"
                      name="subject"
                      placeholder="Project Discussion"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className={`${isSmallScreen ? 'h-10 text-xs' : 'h-12'} bg-background border-input`}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="message" className={`${isSmallScreen ? 'text-xs' : 'text-base'} text-foreground`}>Message</Label>
                    <Textarea
                      id="message"
                      name="message"
                      placeholder="Tell me about your project requirements..."
                      value={formData.message}
                      onChange={handleChange}
                      required
                      className={`${isSmallScreen ? 'min-h-[150px] text-xs' : 'min-h-[200px]'} bg-background border-input`}
                    />
                  </div>
                  <Button
  type="submit"
  className={`w-full ${isSmallScreen ? 'h-10 text-sm' : 'h-12 text-lg'} 
    bg-black text-white hover:bg-white hover:text-black 
    dark:bg-white dark:text-black dark:hover:bg-black dark:hover:text-white 
    transition-colors`}
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
          <p className={`${isSmallScreen ? 'text-xs' : 'text-sm'} text-muted-foreground`}>
            © 2025 Data Analyst Portfolio. Built with React, Vite, Tailwind CSS, GSAP, shadcn/ui, and ☕ by Shashwat Singh.
          </p>
        </div>
      </div>
    </section>
  );
}