import { Download, Mail } from 'lucide-react';
import { Button } from './ui/button';

export function HeroSection() {
  return (
    <section id="hero" className="min-h-screen flex items-start pt-20 justify-center">
      <div className="container mx-auto px-8 md:px-16 lg:px-24 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-8 text-center lg:text-left">
          <div className="space-y-4">
            <h1 className="text-4xl md:text-6xl heading-font tracking-tight">
              <span className="bg-blue-600 bg-clip-text text-transparent">
                HI, I'M SHASHWAT,<br /> DATA ANALYST
              </span>
            </h1>
            <h2 className="text-2xl md:text-3xl text-muted-foreground heading-font">
              TRANSFORMING DATA INTO INSIGHTS
            </h2>
            <p className="text-lg text-muted-foreground text-[18.5px] max-w-lg mx-auto lg:mx-0 leading-relaxed">
              Passionate about uncovering patterns in data and creating compelling visualizations
              that drive business decisions. Specialized in SQL, Python, Tableau, and Excel.
            </p>
          </div>

          <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
            <Button size="lg" className="gap-2 bg-blue-600 text-white hover:bg-black hover:text-white transition-all hover:scale-105">
              <Download className="w-4 h-4 " />
              Download CV
            </Button>
            <Button
              size="lg"
              className="gap-2 bg-blue-600 text-white hover:bg-black hover:text-white transition-all hover:scale-105"
              onClick={() => {
                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              <Mail className="w-4 h-4" />
              Contact Me
            </Button>
          </div>
        </div>

        <div className="flex justify-center lg:justify-end">
          <div className="relative lg:right-[-50px] lg:-top-[50px] md:-right-[120px] md:-top-[30px] transform -translate-x-[100px]">
            <div className="relative -right-[130px] top-[20px] h-[150px] w-[150px] lg:-right-[00px] md:-right-[20px] md:top-[20px] lg:w-[300px] lg:h-[300px] md:h-[150px] md:w-[150px] rounded-full overflow-hidden border-4 border-gray-800 dark:border-border backdrop-blur-sm transform hover:scale-105 transition-all duration-500 hover:rotate-2 animate-float z-10 translate-x-[-50px] translate-y-[50px]">
              <img
                src="/images/profile.png"
                alt="Profile"
                className="w-full h-full object-contain rounded-full transition-transform duration-700 hover:scale-110"
                style={{ objectPosition: 'center top' }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/50 dark:from-background/50 to-transparent"></div>
            </div>

            <div className="relative -bottom-[20px] left-[90px] md:-bottom-[30px] md:-left-[10px] lg:-bottom-[30px] lg:-left-[00px] transform -translate-x-1/2 text-center w-full animate-float">
              <h3 className="text-3xl heading-font font-bold text-blue-600 !text-blue-600">SHASHWAT SINGH</h3>
              <p className="text-muted-foreground mt-2">Data Analyst</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}