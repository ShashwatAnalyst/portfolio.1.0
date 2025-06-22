import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { ExternalLink, Github } from 'lucide-react';
import { useUltraSmoothScroll } from '../hooks/UltraSmoothScroll';
import { useState, useEffect } from 'react';

const projects = [
  {
    id: 1,
    title: "Sales Analytics Dashboard",
    description: "Comprehensive dashboard analyzing sales performance across multiple regions with real-time KPI tracking and predictive analytics.",
    image: "https://images.pexels.com/photos/590020/pexels-photo-590020.jpeg?auto=compress&cs=tinysrgb&w=600",
    technologies: ["Python", "Tableau", "SQL", "AWS"],
    liveUrl: "#",
    githubUrl: "#",
    highlights: ["40% increase in sales insights", "Real-time data processing", "Automated reporting"]
  },
  {
    id: 2,
    title: "Customer Segmentation Analysis",
    description: "Machine learning-based customer segmentation to optimize marketing strategies and improve customer retention rates.",
    image: "https://images.pexels.com/photos/669615/pexels-photo-669615.jpeg?auto=compress&cs=tinysrgb&w=600",
    technologies: ["Python", "scikit-learn", "Pandas", "Matplotlib"],
    liveUrl: "#",
    githubUrl: "#",
    highlights: ["25% improvement in targeting", "K-means clustering", "Interactive visualizations"]
  },
  {
    id: 3,
    title: "Financial Risk Assessment Tool",
    description: "Automated risk assessment system for loan applications using machine learning algorithms and historical data analysis.",
    image: "https://images.pexels.com/photos/730547/pexels-photo-730547.jpeg?auto=compress&cs=tinysrgb&w=600",
    technologies: ["R", "Power BI", "SQL Server", "Azure"],
    liveUrl: "#",
    githubUrl: "#",
    highlights: ["30% faster processing", "95% accuracy rate", "Regulatory compliance"]
  },
  {
    id: 4,
    title: "Supply Chain Optimization",
    description: "Data-driven analysis of supply chain inefficiencies with recommendations for cost reduction and improved delivery times.",
    image: "https://images.pexels.com/photos/906494/pexels-photo-906494.jpeg?auto=compress&cs=tinysrgb&w=600",
    technologies: ["Excel", "Python", "Tableau", "Google Analytics"],
    liveUrl: "#",
    githubUrl: "#",
    highlights: ["20% cost reduction", "Improved efficiency", "Automated monitoring"]
  }
];

export function ProjectsSection() {
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

  return (
    <section ref={addSection} id="projects" className="min-h-screen flex items-center justify-center">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className={`${isSmallScreen ? 'text-2xl md:text-3xl' : 'text-3xl md:text-4xl'} heading-font font-normal mb-4`}>FEATURED PROJECTS</h2>
          <p className={`${isSmallScreen ? 'text-xs md:text-sm' : 'text-lg'} text-muted-foreground ${isSmallScreen ? 'text-[12px]' : 'text-[18.5px]'} max-w-2xl mx-auto`}>
            A showcase of my data analysis projects that demonstrate problem-solving skills and business impact
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project) => (
            <Card key={project.id} className="group overflow-hidden hover:shadow-xl transition-all duration-500 hover:-translate-y-2">
              <div className="relative overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className={`w-full ${isSmallScreen ? 'h-32' : 'h-48'} object-cover transition-transform duration-500 group-hover:scale-110`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <div className="flex gap-2">
                    <Button size={isSmallScreen ? "sm" : "sm"} className={`gap-2 ${isSmallScreen ? 'text-xs px-2 py-1' : ''}`} asChild>
                      <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className={`${isSmallScreen ? 'w-3 h-3' : 'w-4 h-4'}`} />
                        Live Demo
                      </a>
                    </Button>
                    <Button size={isSmallScreen ? "sm" : "sm"} variant="outline" className={`gap-2 bg-background/20 backdrop-blur-sm border-white/20 text-white hover:bg-white/20 ${isSmallScreen ? 'text-xs px-2 py-1' : ''}`} asChild>
                      <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                        <Github className={`${isSmallScreen ? 'w-3 h-3' : 'w-4 h-4'}`} />
                        Code
                      </a>
                    </Button>
                  </div>
                </div>
              </div>

              <CardHeader className={`${isSmallScreen ? 'p-3' : ''}`}>
                <CardTitle className={`${isSmallScreen ? 'text-sm font-[60]' : 'text-[25px] font-[60] lg:text-[22px] lg:font-[60]'} heading-font tracking-wider text-black dark:text-foreground/80 group-hover:text-primary transition-colors`}>
                  {project.title.toUpperCase()}
                </CardTitle>
                <p className={`${isSmallScreen ? 'text-xs' : 'text-lg'} text-black dark:text-muted-foreground ${isSmallScreen ? 'text-[10px]' : 'text-[18.5px]'}`}>
                  {project.description}
                </p>
              </CardHeader>

              <CardContent className={`space-y-4 ${isSmallScreen ? 'p-3' : ''}`}>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <Badge key={tech} variant="secondary" className={`${isSmallScreen ? 'text-xs px-2 py-1' : 'text-xs'}`}>
                      {tech}
                    </Badge>
                  ))}
                </div>

                <div className="space-y-2">
                  <h4 className={`font-medium ${isSmallScreen ? 'text-xs' : 'text-sm'} text-black dark:text-foreground`}>Key Achievements:</h4>
                  <ul className="space-y-1">
                    {project.highlights.map((highlight, index) => (
                      <li key={index} className={`${isSmallScreen ? 'text-xs' : 'text-xs'} text-black dark:text-muted-foreground flex items-center gap-2`}>
                        <div className={`${isSmallScreen ? 'w-1 h-1' : 'w-1.5 h-1.5'} bg-primary rounded-full`}></div>
                        {highlight}
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}