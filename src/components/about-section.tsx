import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { BarChart3, Database, TrendingUp, Users, Code, PieChart, FileSpreadsheet, Brain, MessageSquare, Search, Brush } from 'lucide-react';
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

  const skillCards = [
    {
      icon: BarChart3,
      title: "Data Visualization",
      description: "Creating compelling charts and dashboards that tell a story",
      category: "skill"
    },
    {
      icon: Database,
      title: "Database Management",
      description: "Optimizing queries and managing large datasets",
      category: "skill"
    },
    {
      icon: TrendingUp,
      title: "Business Intelligence",
      description: "Turning raw data into actionable business insights",
      category: "skill"
    },
    {
      icon: Users,
      title: "Stakeholder Communication",
      description: "Presenting complex findings in accessible formats",
      category: "skill"
    }
  ];

  const competencyCards = [
    {
      icon: BarChart3,
      title: "Data Analysis",
      description: "Extracting meaningful patterns and insights from complex datasets",
      category: "competency"
    },
    {
      icon: Code,
      title: "SQL",
      description: "Advanced querying, optimization, and database management techniques",
      category: "competency"
    },
    {
      icon: Brain,
      title: "Python",
      description: "Data analysis, automation, and manipulation with pandas, numpy, and more.",
      category: "competency"
    },
    {
      icon: PieChart,
      title: "Tableau",
      description: "Creating interactive dashboards and compelling data visualizations",
      category: "competency"
    },
    {
      icon: FileSpreadsheet,
      title: "Excel",
      description: "Advanced formulas, pivot tables, and comprehensive data modeling",
      category: "competency"
    },
    {
      icon: Brush,
      title: "Data Visualization Design",
      description: "Designing clear, impactful charts that communicate insights effectively",
      category: "competency"
    },
    {
      icon: TrendingUp,
      title: "Statistical Analysis",
      description: "Hypothesis testing, regression analysis, and predictive modeling techniques",
      category: "competency"
    },
    {
      icon: Search,
      title: "Data Cleaning",
      description: "Transforming raw data into clean, reliable datasets for analysis",
      category: "competency"
    },
    {
      icon: Database,
      title: "Business Intelligence Strategy",
      description: "Converting data into strategic insights for informed decision-making",
      category: "competency"
    },
    {
      icon: MessageSquare,
      title: "Data Storytelling",
      description: "Crafting narratives that make data insights memorable and actionable",
      category: "competency"
    }
  ];

  const allCards = [...skillCards, ...competencyCards];

  return (
    <section ref={addSection} id="about" className="flex items-center justify-center py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className={`${isSmallScreen ? 'text-2xl md:text-3xl' : 'text-3xl md:text-4xl'} heading-font mb-4`}>ABOUT ME</h2>
        </div>

        {/* WHO AM I section */}

        <Card className="bg-gradient-to-br from-background to-muted/20 border-0 shadow-xl mb-16">
          <CardContent className="p-12">
            <div className="max-w-4xl mx-auto text-center space-y-6">
              <div className="text-left">
                <span className="text-sm font-semibold uppercase tracking-widest text-primary">This is me</span>
                <div className="w-12 h-px bg-primary mt-2 mb-4"></div>   
              </div>

              <div className="flex flex-col md:flex-row items-start gap-8">
                {/* Left: Name Heading */}
                <div className="md:w-1/2 w-full text-left">
                  <h2 className="text-3xl md:text-5xl font-extrabold text-black dark:text-foreground mb-2">Hi, I'm Shashwat.</h2>
                </div>
                {/* Right: Bio Paragraphs */}
                <div className="md:w-1/2 w-full space-y-4 mt-5">                   
  <p className={`${isSmallScreen ? 'text-sm' : 'text-lg'} text-black dark:text-muted-foreground leading-relaxed text-left`}>                   
    I'm a Data Analyst dedicated to turning raw data into actionable insights through ETL, automation, analytics, and visualization.                   
  </p>                   
  <p className={`${isSmallScreen ? 'text-sm' : 'text-lg'} text-black dark:text-muted-foreground leading-relaxed text-left`}>                     
    Alongside my data work, I build projects with frontend technologies to create user-friendly, data-driven interfaces. My goal is to make complex analytics accessible and intuitive.                   
  </p>
</div>
                
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Skills & Competencies Section */}
        <Card className="bg-gradient-to-br from-background to-muted/20 border-0 shadow-xl overflow-hidden">
          <CardHeader className="text-center pb-8">
            <CardTitle className={`${isSmallScreen ? 'text-xl' : 'text-3xl'} font-[60] heading-font text-black dark:text-foreground tracking-wider mb-6`}>
              SKILLS & EXPERTISE
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="relative overflow-hidden">
              {/* Horizontal scrolling container */}
              <div
                className="flex gap-6 animate-scroll hover:pause-animation"
                style={{
                  width: `${(allCards.length * 2) * (320 + 24)}px`, // Total width calculation
                  paddingLeft: '2rem',
                  paddingRight: '2rem',
                  paddingBottom: '2rem'
                }}
              >
                {/* First set of cards */}
                {allCards.map((card, index) => (
                  <Card
                    key={`first-${card.title}-${index}`}
                    className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 flex-shrink-0 w-96 bg-white dark:bg-card hover:bg-gradient-to-br hover:from-primary/5 hover:to-primary/10"
                  >
                    <CardHeader className="text-center pb-4">
                      <div className={`mx-auto ${isSmallScreen ? 'w-12 h-12' : 'w-16 h-16'} bg-primary/10 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-primary/20 transition-all duration-300`}>
                        <card.icon className={`${isSmallScreen ? 'w-6 h-6' : 'w-8 h-8'} text-primary group-hover:text-primary/80`} />
                      </div>
                      <CardTitle className={`${isSmallScreen ? 'text-base' : 'text-xl'} font-[60] heading-font tracking-wider text-black dark:text-foreground group-hover:text-primary transition-colors`}>
                        {card.title.toUpperCase()}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <p className={`${isSmallScreen ? 'text-sm' : 'text-base'} text-black dark:text-muted-foreground text-center leading-relaxed group-hover:text-foreground transition-colors`}>
                        {card.description}
                      </p>
                      <div className="mt-4 flex justify-center items-center h-8">
                        <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${card.category === 'skill'
                          ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300'
                          : 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300'
                          }`}>
                          {card.category === 'skill' ? 'Core Skill' : 'Technical Expertise'}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                ))}

                {/* Second set of cards for seamless loop */}
                {allCards.map((card, index) => (
                  <Card
                    key={`second-${card.title}-${index}`}
                    className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 flex-shrink-0 w-96 bg-white dark:bg-card hover:bg-gradient-to-br hover:from-primary/5 hover:to-primary/10"
                  >
                    <CardHeader className="text-center pb-4">
                      <div className={`mx-auto ${isSmallScreen ? 'w-12 h-12' : 'w-16 h-16'} bg-primary/10 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-primary/20 transition-all duration-300`}>
                        <card.icon className={`${isSmallScreen ? 'w-6 h-6' : 'w-8 h-8'} text-primary group-hover:text-primary/80`} />
                      </div>
                      <CardTitle className={`${isSmallScreen ? 'text-base' : 'text-xl'} font-[60] heading-font tracking-wider text-black dark:text-foreground group-hover:text-primary transition-colors`}>
                        {card.title.toUpperCase()}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <p className={`${isSmallScreen ? 'text-sm' : 'text-base'} text-black dark:text-muted-foreground text-center leading-relaxed group-hover:text-foreground transition-colors`}>
                        {card.description}
                      </p>
                      <div className="mt-4 flex justify-center items-center h-8">
                        <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${card.category === 'skill'
                          ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300'
                          : 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300'
                          }`}>
                          {card.category === 'skill' ? 'Core Skill' : 'Technical Expertise'}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Gradient overlays for fade effect */}
              <div className="absolute top-0 left-0 w-12 h-full bg-gradient-to-r from-background to-transparent pointer-events-none z-10" />
              <div className="absolute top-0 right-0 w-12 h-full bg-gradient-to-l from-background to-transparent pointer-events-none z-10" />
            </div>
          </CardContent>
        </Card>
      </div>

      <style>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        
        .animate-scroll {
          animation: scroll 60s linear infinite;
        }
        
        .hover\\:pause-animation:hover .animate-scroll,
        .pause-animation {
          animation-play-state: paused !important;
        }
        
        .hover\\:pause-animation:hover {
          animation-play-state: paused !important;
        }
      `}</style>
    </section>
  );
}