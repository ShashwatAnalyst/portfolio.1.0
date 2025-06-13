import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { BarChart3, Database, TrendingUp, Users } from 'lucide-react';
import { useUltraSmoothScroll } from '@/hooks/UltraSmoothScroll';

export function AboutSection() {
  const { addSection } = useUltraSmoothScroll();
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
          <h2 className="text-3xl md:text-4xl heading-font mb-4">ABOUT ME</h2>
          <p className="text-muted-foreground text-[18.5px]  max-w-2xl mx-auto leading-relaxed">
            A passionate Data Analyst with a strong foundation in data analysis and visualization.
            I'm eager to apply my skills in transforming raw data into meaningful insights that drive business decisions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {highlights.map((highlight, index) => (
            <Card key={index} className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-2">
              <CardHeader className="text-center">
                <div className="mx-auto w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <highlight.icon className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="text-[23px] font-[60] lg:text-[20px] lg:font-[60] heading-font tracking-wider text-black dark:text-foreground/80">{highlight.title.toUpperCase()}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-black dark:text-muted-foreground text-[18.5px] text-center leading-relaxed">
                  {highlight.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="bg-gradient-to-br from-background to-muted/20 border-0 shadow-xl">
          <CardContent className="p-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div className="space-y-6 text-center  lg:text-left">
                <h3 className="text-2xl text-[25px] font-[60] heading-font text-black dark:text-foreground">MY JOURNEY</h3>
                <p className="text-black dark:text-muted-foreground text-[18.5px] leading-relaxed">
                  As a recent graduate, I'm excited to begin my journey in data analysis. I've developed a strong foundation in data manipulation,
                  statistical analysis, and visualization through my academic projects and personal learning.
                </p>
                <p className="text-black dark:text-muted-foreground text-[18.5px] leading-relaxed">
                  I'm passionate about learning and applying data analysis techniques to solve real-world problems.
                  I believe in continuous learning and staying updated with the latest tools and technologies in the field.
                </p>
              </div>
              <div className="space-y-4 text-center lg:text-left">
                <h4 className="text-lg text-[25px] font-[60] heading-font text-black dark:text-foreground">CORE COMPETENCIES</h4>
                <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
                  {[
                    'Data Analysis', 'SQL', 'Python', 'Tableau', 'Excel',
                    'Data Visualization', 'Statistical Analysis', 'Data Cleaning',
                    'Business Intelligence', 'Data Storytelling'
                  ].map((skill) => (
                    <Badge key={skill} variant="secondary" className="transition-colors hover:bg-primary hover:text-primary-foreground">
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