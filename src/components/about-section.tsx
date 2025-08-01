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

  // Calculate card width and gap based on screen size
  const cardWidth = isSmallScreen ? 240 : 320; // Smaller cards for mobile
  const cardGap = isSmallScreen ? 16 : 24; // Smaller gap for mobile

  return (
    <section ref={addSection} id="about" className="flex items-center justify-center py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className={`${isSmallScreen ? 'text-2xl md:text-3xl' : 'text-3xl md:text-4xl'} heading-font mb-4`}>ABOUT ME</h2>
        </div>

        {/* WHO AM I section */}
        <Card className="bg-gradient-to-br from-background to-muted/20 border-0 shadow-xl mb-16">
  <CardContent className="p-8">
    
    {/* Section Label - now fully left-aligned */}
    <div className="text-left">
      <span className="text-sm font-semibold uppercase tracking-widest text-primary">This is me</span>
      <div className="w-12 h-px bg-primary mt-2 mb-4"></div>   
    </div>

    {/* Centered Content Block */}
    <div className="max-w-4xl mx-auto text-center space-y-6">
      <div className="flex flex-col md:flex-row items-start gap-8">
        {/* Left: Name Heading */}
        <div className="md:w-1/2 w-full text-left">
                  <h2 className="text-3xl md:text-5xl font-extrabold text-black dark:text-foreground mb-2">Hi, I'm Shashwat.</h2>
                </div>

        {/* Right: Bio Paragraphs */}
        <div className="md:w-1/2 w-full space-y-4 mt-5">                   
        <p className={`${isSmallScreen ? 'text-sm' : 'text-lg'} text-muted-foreground leading-relaxed text-left`}>
  I'm a <span className="text-black dark:text-white font-medium">Data Analyst</span> passionate about transforming raw data into 
  <span className="text-black dark:text-white font-medium"> actionable insights</span> using 
  <span className="text-black dark:text-white font-medium"> ETL pipelines</span>, 
  <span className="text-black dark:text-white font-medium"> automation</span>, and 
  <span className="text-black dark:text-white font-medium"> data visualization</span>. 
  As a <span className="text-black dark:text-white font-medium">tech enthusiast</span>, I constantly explore 
  <span className="text-black dark:text-white font-medium"> modern tools</span> like 
  <span className="text-black dark:text-white font-medium"> Python</span>, 
  <span className="text-black dark:text-white font-medium"> SQL</span>, and 
  <span className="text-black dark:text-white font-medium"> Tableau</span> to uncover trends and optimize decision-making.
</p>

<p className={`${isSmallScreen ? 'text-sm' : 'text-lg'} text-muted-foreground leading-relaxed text-left`}>
  I also build projects using <span className="text-black dark:text-white font-medium">frontend technologies</span> like 
  <span className="text-black dark:text-white font-medium"> React</span> and 
  <span className="text-black dark:text-white font-medium"> Tailwind CSS</span> to craft clean, interactive 
  <span className="text-black dark:text-white font-medium"> data-driven interfaces</span>. 
  My goal is to make <span className="text-black dark:text-white font-medium"> analytics</span> not only accurate but also 
  <span className="text-black dark:text-white font-medium"> accessible and intuitive</span> for users across all technical levels.
</p>


        </div>
      </div>
    </div>
  </CardContent>
</Card>


        {/* Skills & Competencies Section */}
        <Card className="bg-gradient-to-br from-background to-muted/20 border-0 shadow-xl overflow-hidden">
          <CardHeader className="pb-8 px-8 pt-8">
            <div className="text-left">
              <span className="text-sm font-semibold uppercase tracking-widest text-primary">Skills & Expertise</span>
              <div className="w-12 h-px bg-primary mt-2 mb-4"></div>   
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="relative overflow-hidden">
              {/* Horizontal scrolling container */}
              <div
                className="flex animate-scroll hover:pause-animation"
                style={{
                  width: `${(allCards.length * 2) * (cardWidth + cardGap)}px`, // Dynamic width calculation
                  gap: `${cardGap}px`,
                  paddingLeft: isSmallScreen ? '1rem' : '2rem',
                  paddingRight: isSmallScreen ? '1rem' : '2rem',
                  paddingBottom: isSmallScreen ? '1rem' : '2rem'
                }}
              >
                {/* First set of cards */}
                {allCards.map((card, index) => (
                 <Card
  key={`second-${card.title}-${index}`}
  className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 flex-shrink-0 bg-white dark:bg-card hover:bg-gradient-to-br hover:from-primary/5 hover:to-primary/10
             flex flex-col justify-center gap-6" // 🔥 Added gap here
  style={{ width: `${cardWidth}px`, height: isSmallScreen ? '260px' : '300px' }}
>

                
                    <CardHeader className={`text-center ${isSmallScreen ? 'pb-2 pt-4 px-3' : 'pb-4'}`}>
  <div className={`mx-auto ${isSmallScreen ? 'w-10 h-10' : 'w-12 h-12'} bg-primary/10 rounded-xl flex items-center justify-center ${isSmallScreen ? 'mb-2' : 'mb-3'} group-hover:scale-110 group-hover:bg-primary/20 transition-all duration-300`}>
    <card.icon className={`${isSmallScreen ? 'w-5 h-5' : 'w-6 h-6'} text-primary group-hover:text-primary/80`} />
  </div>
  <CardTitle className="text-xs font-semibold uppercase tracking-widest text-primary transition-colors">
    {card.title}
  </CardTitle>
</CardHeader>
<CardContent className={`pt-0 ${isSmallScreen ? 'px-3 pb-3' : 'px-4 pb-4'} flex flex-col gap-3 items-center`}>
  <p className={`text-sm text-black dark:text-muted-foreground text-center leading-snug group-hover:text-foreground transition-colors ${isSmallScreen ? 'line-clamp-3' : ''}`}>
    {card.description}
  </p>
  <div className="mt-2 flex justify-center items-center h-6">
    <span className="inline-block px-2 py-[2px] text-[10px] rounded-full font-medium
      ${card.category === 'skill'
        ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300'
        : 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300'}">
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
                 className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 flex-shrink-0 bg-white dark:bg-card hover:bg-gradient-to-br hover:from-primary/5 hover:to-primary/10
                            flex flex-col justify-center gap-3" // 🔥 Vertically center content
                 style={{ width: `${cardWidth}px`, height: isSmallScreen ? '260px' : '300px' }} // 🔧 Give it fixed height for alignment
               >
                 <CardHeader className={`text-center ${isSmallScreen ? 'pb-2 pt-4 px-3' : 'pb-4'}`}>
                   <div className={`mx-auto ${isSmallScreen ? 'w-10 h-10' : 'w-12 h-12'} bg-primary/10 rounded-xl flex items-center justify-center ${isSmallScreen ? 'mb-2' : 'mb-3'} group-hover:scale-110 group-hover:bg-primary/20 transition-all duration-300`}>
                     <card.icon className={`${isSmallScreen ? 'w-5 h-5' : 'w-6 h-6'} text-primary group-hover:text-primary/80`} />
                   </div>
                   <CardTitle className="text-xs font-semibold uppercase tracking-widest text-primary transition-colors">
                     {card.title}
                   </CardTitle>
                 </CardHeader>
               
                 <CardContent className={`pt-0 ${isSmallScreen ? 'px-3 pb-3' : 'px-4 pb-4'} flex flex-col gap-3 items-center`}>
                   <p className="text-sm text-black dark:text-muted-foreground text-center leading-snug group-hover:text-foreground transition-colors">
                     {card.description}
                   </p>
                   <div className="mt-2 flex justify-center items-center h-6">
                     <span className={`inline-block px-2 py-[2px] text-[10px] rounded-full font-medium ${
                       card.category === 'skill'
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
              <div className={`absolute top-0 left-0 ${isSmallScreen ? 'w-8' : 'w-12'} h-full bg-gradient-to-r from-background to-transparent pointer-events-none z-10`} />
              <div className={`absolute top-0 right-0 ${isSmallScreen ? 'w-8' : 'w-12'} h-full bg-gradient-to-l from-background to-transparent pointer-events-none z-10`} />
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
          animation: scroll ${isSmallScreen ? '45s' : '60s'} linear infinite;
        }
        
        .hover\\:pause-animation:hover .animate-scroll,
        .pause-animation {
          animation-play-state: paused !important;
        }
        
        .hover\\:pause-animation:hover {
          animation-play-state: paused !important;
        }

        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </section>
  );
}