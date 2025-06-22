import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { BarChart3, Database, TrendingUp, Users } from 'lucide-react';
import { useUltraSmoothScroll } from '../hooks/UltraSmoothScroll';
import { useState, useEffect } from 'react';

export function AboutSection() {
  const { addSection } = useUltraSmoothScroll();
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsSmallScreen(window.innerWidth < 450);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  const highlights = [
    {
      icon: BarChart3,
      title: "Data Visualization",
      description: "Creating compelling charts and dashboards that tell a story"
    },
    {
      icon: Database,
      title: "Database Management",
      description: "Optimizing queries and managing large datasets "
    },
    {
      icon: TrendingUp,
      title: "Business Intelligence",
      description: "Turning raw data into actionable business insights"
    },
    {
      icon: Users,
      title: "Stakeholder Communication",
      description: "Presenting complex findings in accessible formats"
    }
  ];

  return (
    <section ref={addSection} id="about" className="flex items-center justify-center">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className={`${isSmallScreen ? 'text-2xl md:text-3xl' : 'text-3xl md:text-4xl'} heading-font mb-4`}>ABOUT ME</h2>
          <p className={`${isSmallScreen ? 'text-xs md:text-sm' : 'text-lg'} text-muted-foreground ${isSmallScreen ? 'text-[12px]' : 'text-[18.5px]'} max-w-2xl mx-auto leading-relaxed`}>
            As a Data Analyst, I specialize in converting raw data into actionable insights.
            Driven by curiosity, I enjoy revealing the narratives within data to inform business strategy.
          </p>
          <p className={`${isSmallScreen ? 'text-xs md:text-sm' : 'text-lg'} text-muted-foreground ${isSmallScreen ? 'text-[12px]' : 'text-[18.5px]'} max-w-2xl mx-auto leading-relaxed mt-4`}>
            Here are some of the key areas where I focus my skills:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {highlights.map((highlight, index) => (
            <Card key={index} className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-2">
              <CardHeader className="text-center">
                <div className={`mx-auto ${isSmallScreen ? 'w-8 h-8' : 'w-12 h-12'} bg-primary/10 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <highlight.icon className={`${isSmallScreen ? 'w-4 h-4' : 'w-6 h-6'} text-primary`} />
                </div>
                <CardTitle className={`${isSmallScreen ? 'text-sm font-[60]' : 'text-[23px] font-[60] lg:text-[20px] lg:font-[60]'} heading-font tracking-wider text-black dark:text-foreground/80`}>{highlight.title.toUpperCase()}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className={`${isSmallScreen ? 'text-xs' : 'text-lg'} text-black dark:text-muted-foreground ${isSmallScreen ? 'text-[10px]' : 'text-[18.5px]'} text-center leading-relaxed`}>
                  {highlight.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="bg-gradient-to-br from-background to-muted/20 border-0 shadow-xl">
          <CardContent className={`${isSmallScreen ? 'p-4' : 'p-8'}`}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div className="space-y-6 text-center lg:text-left">
                <h3 className={`${isSmallScreen ? 'text-lg' : 'text-2xl'} text-[25px] font-[60] heading-font text-black dark:text-foreground`}>MY JOURNEY</h3>
                <p className={`${isSmallScreen ? 'text-xs' : 'text-lg'} text-black dark:text-muted-foreground ${isSmallScreen ? 'text-[10px]' : 'text-[18.5px]'} leading-relaxed`}>
                  My journey into data analysis began in my academic career, where I cultivated a robust foundation in data manipulation,
                  statistical methods, and visualization. This experience ignited my passion for solving real-world challenges through data.
                  I am a firm believer in lifelong learning and am constantly seeking to expand my toolkit and stay at the forefront of this dynamic field.
                </p>
              </div>
              <div className="space-y-4 text-center lg:text-left">
                <h4 className={`${isSmallScreen ? 'text-base' : 'text-lg'} text-[25px] font-[60] heading-font text-black dark:text-foreground`}>CORE COMPETENCIES</h4>
                <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
                  {[
                    'Data Analysis', 'SQL', 'Python', 'Tableau', 'Excel',
                    'Data Visualization', 'Statistical Analysis', 'Data Cleaning',
                    'Business Intelligence', 'Data Storytelling'
                  ].map((skill) => (
                    <Badge key={skill} variant="secondary" className={`${isSmallScreen ? 'text-xs px-2 py-1' : ''} transition-colors hover:bg-primary hover:text-primary-foreground`}>
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}