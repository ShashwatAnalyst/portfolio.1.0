import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Github } from 'lucide-react';
import { useUltraSmoothScroll } from '../hooks/UltraSmoothScroll';
import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    id: 1,
    title: "Sales Analytics Dashboard",
    description: "Comprehensive dashboard analyzing sales performance across multiple regions with real-time KPI tracking and predictive analytics. This project demonstrates advanced data visualization techniques and business intelligence solutions that helped increase sales insights by 40% while implementing automated reporting systems.",
    image: "https://images.pexels.com/photos/590020/pexels-photo-590020.jpeg?auto=compress&cs=tinysrgb&w=600",
    technologies: ["Python", "Tableau", "SQL", "AWS"],
    githubUrl: "#"
  },
  {
    id: 2,
    title: "Customer Segmentation Analysis",
    description: "Machine learning-based customer segmentation to optimize marketing strategies and improve customer retention rates. Utilized advanced clustering algorithms and statistical analysis to identify distinct customer groups, resulting in 25% improvement in marketing campaign targeting and significantly enhanced customer engagement metrics.",
    image: "https://images.pexels.com/photos/669615/pexels-photo-669615.jpeg?auto=compress&cs=tinysrgb&w=600",
    technologies: ["Python", "scikit-learn", "Pandas", "Matplotlib"],
    githubUrl: "#"
  },
  {
    id: 3,
    title: "Financial Risk Assessment Tool",
    description: "Automated risk assessment system for loan applications using machine learning algorithms and historical data analysis. This comprehensive solution processes applications 30% faster while maintaining 95% accuracy rate and full regulatory compliance, revolutionizing the traditional loan approval process.",
    image: "https://images.pexels.com/photos/730547/pexels-photo-730547.jpeg?auto=compress&cs=tinysrgb&w=600",
    technologies: ["R", "Power BI", "SQL Server", "Azure"],
    githubUrl: "#"
  },
  {
    id: 4,
    title: "Supply Chain Optimization",
    description: "Data-driven analysis of supply chain inefficiencies with recommendations for cost reduction and improved delivery times. Through comprehensive data modeling and predictive analytics, achieved 20% cost reduction and significantly improved operational efficiency with automated monitoring systems.",
    image: "https://images.pexels.com/photos/906494/pexels-photo-906494.jpeg?auto=compress&cs=tinysrgb&w=600",
    technologies: ["Excel", "Python", "Tableau", "Google Analytics"],
    githubUrl: "#"
  }
];

export function ProjectsSection() {
  const { addSection } = useUltraSmoothScroll();
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsSmallScreen(window.innerWidth < 450);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  useEffect(() => {
    // Clear any existing ScrollTriggers
    ScrollTrigger.getAll().forEach(trigger => trigger.kill());

    // GSAP ScrollTrigger animations with optimized settings
    cardRefs.current.forEach((card, index) => {
      if (card) {
        // Set initial state - cards start invisible from bottom
        gsap.set(card, {
          y: 50,
          opacity: 0
        });

        // Create scroll trigger animation with simplified and responsive trigger points
        ScrollTrigger.create({
          trigger: card,
          start: "top 85%",     // Start animation earlier for smoother entry
          end: "bottom 25%",    // End animation later to reduce flickering on upward scroll
          onEnter: () => {
            // Card enters from bottom
            gsap.to(card, {
              y: 0,
              opacity: 1,
              duration: 0.6,
              ease: "power2.out",
              delay: index * 0.05  // Reduced stagger delay
            });
          },
          onLeave: () => {
            // Card leaves at top - subtle upward movement (reduced from -30 to -15)
            gsap.to(card, {
              y: -15,
              opacity: 0,
              duration: 0.5,
              ease: "power2.out"  // Changed from power2.in to power2.out for smoother exit
            });
          },
          onEnterBack: () => {
            // Card re-enters from top - smooth transition
            gsap.to(card, {
              y: 0,
              opacity: 1,
              duration: 0.5,
              ease: "power2.out"
            });
          },
          onLeaveBack: () => {
            // Card leaves at bottom - subtle downward movement (reduced from 30 to 15)
            gsap.to(card, {
              y: 15,
              opacity: 0,
              duration: 0.5,
              ease: "power2.out"  // Changed from power2.in to power2.out for smoother exit
            });
          },
          // Add some margin to prevent rapid triggering
          markers: false,
          refreshPriority: -1,
          invalidateOnRefresh: true
        });

        // Simplified hover animations
        const handleMouseEnter = () => {
          const currentOpacity = gsap.getProperty(card, "opacity") as number;
          if (currentOpacity > 0.8) {
            gsap.to(card, {
              y: "-=5",
              scale: 1.01,
              duration: 0.3,
              ease: "power2.out"
            });
          }
        };

        const handleMouseLeave = () => {
          const currentOpacity = gsap.getProperty(card, "opacity") as number;
          if (currentOpacity > 0.8) {
            gsap.to(card, {
              y: "+=5",
              scale: 1,
              duration: 0.3,
              ease: "power2.out"
            });
          }
        };

        card.addEventListener('mouseenter', handleMouseEnter);
        card.addEventListener('mouseleave', handleMouseLeave);

        // Store cleanup function for event listeners
        card.addEventListener('cleanup', () => {
          card.removeEventListener('mouseenter', handleMouseEnter);
          card.removeEventListener('mouseleave', handleMouseLeave);
        });
      }
    });

    // Cleanup function
    return () => {
      cardRefs.current.forEach(card => {
        if (card) {
          card.dispatchEvent(new Event('cleanup'));
        }
      });
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  // Refresh ScrollTrigger on window resize to maintain responsiveness
  useEffect(() => {
    const handleResize = () => {
      ScrollTrigger.refresh();
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="flex items-center justify-center py-16"
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className={`${isSmallScreen ? 'text-2xl md:text-3xl' : 'text-3xl md:text-4xl'} heading-font font-normal mb-4`}>
            FEATURED PROJECTS
          </h2>
          <p className={`${isSmallScreen ? 'text-xs md:text-sm' : 'text-lg'} text-muted-foreground ${isSmallScreen ? 'text-[12px]' : 'text-[18.5px]'} max-w-2xl mx-auto`}>
            A showcase of my data analysis projects that demonstrate problem-solving skills and business impact
          </p>
        </div>

        <div className="flex flex-col items-center space-y-12">
          {projects.map((project, index) => (
            <div
              key={project.id}
              ref={(el) => cardRefs.current[index] = el}
              className="w-[90vw] max-w-7xl"
            >
              <Card className="overflow-hidden bg-white dark:bg-card shadow-lg">
                <div className="flex flex-col md:flex-row h-full">
                  {/* Image Section - 35-40% width */}
                  <div className="md:w-[38%] relative overflow-hidden group">
                    <img
                      src={project.image}
                      alt={project.title}
                      className={`w-full ${isSmallScreen ? 'h-48' : 'h-full md:h-80 lg:h-96'} object-cover transition-transform duration-700 group-hover:scale-110`}
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/20 group-hover:to-black/40 transition-all duration-500"></div>
                  </div>

                  {/* Content Section - 60-65% width */}
                  <div className="md:w-[62%] flex flex-col justify-between">
                    <CardHeader className={`${isSmallScreen ? 'p-4' : 'p-8'} pb-4`}>
                      <CardTitle className={`${isSmallScreen ? 'text-lg' : 'text-2xl lg:text-3xl'} heading-font font-normal tracking-wider text-black dark:text-foreground/90 hover:text-primary transition-colors duration-300 mb-4`}>
                        {project.title.toUpperCase()}
                      </CardTitle>
                      <p className={`${isSmallScreen ? 'text-sm leading-relaxed' : 'text-lg leading-relaxed'} text-black/80 dark:text-muted-foreground ${isSmallScreen ? 'text-[14px]' : 'text-[17px]'}`}>
                        {project.description}
                      </p>
                    </CardHeader>

                    <CardContent className={`${isSmallScreen ? 'p-4' : 'p-8'} pt-0 space-y-6`}>
                      <div className="flex flex-wrap gap-3">
                        {project.technologies.map((tech) => (
                          <Badge 
                            key={tech} 
                            variant="secondary" 
                            className={`${isSmallScreen ? 'text-xs px-3 py-1' : 'text-sm px-4 py-2'} hover:bg-primary hover:text-primary-foreground transition-colors duration-300`}
                          >
                            {tech}
                          </Badge>
                        ))}
                      </div>

                      <div className="pt-2">
                        <Button 
                          size={isSmallScreen ? "sm" : "lg"} 
                          className={`gap-2 bg-black hover:bg-black/80 text-white transition-all duration-300 hover:shadow-lg ${isSmallScreen ? 'text-xs px-4 py-2' : 'px-8 py-4 text-base'}`} 
                          asChild
                        >
                          <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                            <Github className={`${isSmallScreen ? 'w-3 h-3' : 'w-5 h-5'}`} />
                            View on GitHub
                          </a>
                        </Button>
                      </div>
                    </CardContent>
                  </div>
                </div>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}