"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  ArrowLeft,
  Calendar,
  User,
  Clock,
  Tag,
  Share2,
  BookOpen,
  Twitter,
  Facebook,
  Linkedin,
  Copy,
  Check,
} from "lucide-react"
import { Separator } from "@/components/ui/separator"

const blogPosts = [
  {
    id: 1,
    title: "The Future of Remote Team Collaboration",
    excerpt: "Discover how remote teams are evolving and the tools that are making collaboration more effective than ever before.",
    content: `
      <p>In today's rapidly evolving work landscape, remote team collaboration has become more than just a trend—it's a necessity. As companies continue to embrace distributed teams, the tools and strategies for effective collaboration are evolving at an unprecedented pace.</p>

      <h2>The Evolution of Remote Work</h2>
      <p>Remote work has transformed from an occasional perk to a fundamental aspect of modern business operations. According to recent studies, over 40% of the global workforce now works remotely at least part-time, with this number expected to grow significantly in the coming years.</p>

      <h2>Key Tools for Success</h2>
      <p>Several categories of tools have emerged as essential for remote team collaboration:</p>
      <ul>
        <li><strong>Communication Platforms:</strong> Tools like Slack, Microsoft Teams, and Discord provide real-time messaging and video capabilities</li>
        <li><strong>Project Management:</strong> Applications such as Trello, Asana, and Monday.com help teams stay organized and on track</li>
        <li><strong>Document Collaboration:</strong> Google Workspace and Microsoft 365 enable seamless document sharing and editing</li>
        <li><strong>Video Conferencing:</strong> Zoom, Google Meet, and Webex facilitate face-to-face interactions regardless of location</li>
      </ul>

      <h2>Best Practices for Remote Teams</h2>
      <p>Successful remote collaboration requires more than just the right tools—it demands intentional practices and cultural adaptations:</p>
      <ul>
        <li>Establish clear communication protocols and response time expectations</li>
        <li>Schedule regular video check-ins to maintain team cohesion</li>
        <li>Create opportunities for informal interactions and team building</li>
        <li>Document processes and decisions clearly for all team members</li>
        <li>Respect different time zones and work preferences</li>
      </ul>

      <h2>The Role of Technology</h2>
      <p>Emerging technologies are reshaping how remote teams interact:</p>
      <ul>
        <li><strong>AI-Powered Assistants:</strong> Tools that can summarize meetings, generate action items, and even suggest optimal meeting times</li>
        <li><strong>Virtual Reality:</strong> Immersive environments for collaborative work and team building</li>
        <li><strong>Advanced Analytics:</strong> Insights into team productivity and collaboration patterns</li>
        <li><strong>Async Communication:</strong> Tools designed specifically for teams working across different time zones</li>
      </ul>

      <h2>Measuring Success</h2>
      <p>To ensure remote collaboration is effective, teams should track key metrics:</p>
      <ul>
        <li>Project completion rates and timelines</li>
        <li>Team satisfaction and engagement scores</li>
        <li>Communication response times and frequency</li>
        <li>Meeting effectiveness and participation rates</li>
      </ul>

      <p>As we look toward the future, remote team collaboration will continue to evolve, driven by technological innovation and changing work preferences. Teams that embrace these changes and invest in the right tools and practices will be best positioned for success in the distributed work environment.</p>
    `,
    author: "Sarah Chen",
    date: "2024-01-15",
    readTime: "5 min read",
    category: "Remote Work",
    image: "/placeholder-blog.jpg",
    featured: true,
    tags: ["remote work", "collaboration", "team management", "productivity", "tools"]
  },
  {
    id: 2,
    title: "10 Project Management Best Practices for 2024",
    excerpt: "Learn the essential project management techniques that successful teams use to deliver projects on time and under budget.",
    content: `
      <p>Effective project management is the cornerstone of successful team operations. As we move through 2024, certain best practices have emerged as essential for delivering projects on time, within budget, and with high quality results.</p>

      <h2>1. Clear Project Scoping</h2>
      <p>Begin every project with a well-defined scope that includes clear objectives, deliverables, and success criteria. This prevents scope creep and ensures everyone understands what success looks like.</p>

      <h2>2. Stakeholder Communication</h2>
      <p>Maintain regular communication with all stakeholders throughout the project lifecycle. This includes status updates, risk assessments, and milestone celebrations.</p>

      <h2>3. Resource Planning</h2>
      <p>Properly allocate human resources, budget, and tools before starting. Consider team members' skills, availability, and workload when assigning tasks.</p>

      <h2>4. Risk Management</h2>
      <p>Identify potential risks early and develop mitigation strategies. Regular risk assessments help teams stay proactive rather than reactive.</p>

      <h2>5. Agile Methodology</h2>
      <p>Embrace agile practices like sprints, daily stand-ups, and iterative development. This approach allows for flexibility and continuous improvement.</p>

      <h2>6. Quality Assurance</h2>
      <p>Implement quality checkpoints throughout the project, not just at the end. Regular testing and validation ensure the final product meets requirements.</p>

      <h2>7. Team Collaboration</h2>
      <p>Foster an environment where team members can easily share ideas, provide feedback, and support each other. Use collaboration tools effectively.</p>

      <h2>8. Progress Tracking</h2>
      <p>Use project management software to track progress, milestones, and dependencies. Visual dashboards help teams stay aligned and motivated.</p>

      <h2>9. Change Management</h2>
      <p>Be prepared to handle changes in requirements or circumstances. Have a clear process for evaluating and implementing changes.</p>

      <h2>10. Post-Project Review</h2>
      <p>After project completion, conduct a thorough review to identify what worked well and what could be improved for future projects.</p>

      <p>Implementing these best practices requires commitment from both project managers and team members. Start with the practices that will have the most immediate impact on your team's success, then gradually incorporate the others as your processes mature.</p>
    `,
    author: "Michael Rodriguez",
    date: "2024-01-12",
    readTime: "8 min read",
    category: "Project Management",
    image: "/placeholder-blog.jpg",
    featured: false,
    tags: ["project management", "best practices", "team leadership", "planning", "execution"]
  },
  {
    id: 3,
    title: "Data-Driven Decision Making: A Complete Guide",
    excerpt: "How to leverage analytics and insights to make better business decisions and drive team performance.",
    content: `
      <p>In today's competitive business environment, making decisions based on data rather than intuition is no longer optional—it's essential. Data-driven decision making (DDDM) enables teams to make informed choices that lead to better outcomes and measurable results.</p>

      <h2>Understanding Data-Driven Decision Making</h2>
      <p>DDDM involves collecting relevant data, analyzing it to extract insights, and using those insights to guide business decisions. This approach removes guesswork and provides a solid foundation for strategic planning.</p>

      <h2>Benefits of Data-Driven Decisions</h2>
      <ul>
        <li><strong>Improved Accuracy:</strong> Data provides objective information that reduces bias in decision making</li>
        <li><strong>Better Resource Allocation:</strong> Understanding what works helps optimize resource distribution</li>
        <li><strong>Risk Reduction:</strong> Data helps identify potential issues before they become problems</li>
        <li><strong>Performance Measurement:</strong> Clear metrics allow teams to track progress and success</li>
        <li><strong>Competitive Advantage:</strong> Teams using data effectively often outperform competitors</li>
      </ul>

      <h2>Key Components of DDDM</h2>
      <h3>1. Data Collection</h3>
      <p>Gather data from multiple sources including customer interactions, operational metrics, market research, and team performance indicators.</p>

      <h3>2. Data Analysis</h3>
      <p>Use statistical methods and analytical tools to identify patterns, trends, and correlations in your data.</p>

      <h3>3. Insight Generation</h3>
      <p>Transform raw data into actionable insights that can guide decision making.</p>

      <h3>4. Decision Implementation</h3>
      <p>Apply insights to make informed decisions and take appropriate actions.</p>

      <h3>5. Results Monitoring</h3>
      <p>Track the outcomes of decisions to validate approaches and inform future decisions.</p>

      <h2>Tools for Data-Driven Decision Making</h2>
      <p>Several tools can help teams implement DDDM effectively:</p>
      <ul>
        <li><strong>Analytics Platforms:</strong> Google Analytics, Adobe Analytics, Mixpanel</li>
        <li><strong>Business Intelligence:</strong> Tableau, Power BI, Looker</li>
        <li><strong>Survey Tools:</strong> SurveyMonkey, Typeform, Google Forms</li>
        <li><strong>Project Management:</strong> Tools with built-in analytics and reporting</li>
      </ul>

      <h2>Overcoming Common Challenges</h2>
      <p>Implementing DDDM isn't without challenges:</p>
      <ul>
        <li><strong>Data Quality:</strong> Ensure data accuracy and completeness</li>
        <li><strong>Team Buy-in:</strong> Help team members understand the value of data-driven approaches</li>
        <li><strong>Technical Skills:</strong> Provide training on data analysis and interpretation</li>
        <li><strong>Privacy and Security:</strong> Maintain data protection while enabling access</li>
      </ul>

      <h2>Getting Started</h2>
      <p>Begin with small, focused initiatives:</p>
      <ol>
        <li>Identify key decisions that could benefit from data insights</li>
        <li>Establish data collection processes for relevant metrics</li>
        <li>Choose appropriate tools for your team's needs and budget</li>
        <li>Train team members on data interpretation</li>
        <li>Start making decisions based on data and measure results</li>
      </ol>

      <p>Data-driven decision making is a journey, not a destination. Start small, learn as you go, and gradually expand your data capabilities across the organization.</p>
    `,
    author: "Alex Johnson",
    date: "2024-01-10",
    readTime: "6 min read",
    category: "Analytics",
    image: "/placeholder-blog.jpg",
    featured: false,
    tags: ["data analytics", "decision making", "business intelligence", "metrics", "strategy"]
  },
  {
    id: 4,
    title: "Building High-Performance Teams in Tech",
    excerpt: "Strategies for recruiting, developing, and retaining top talent in the competitive tech industry.",
    content: `
      <p>Building high-performance teams in the tech industry requires a strategic approach to recruitment, development, and retention. The competition for top talent is fierce, and successful teams understand that attracting and keeping great people is an ongoing process.</p>

      <h2>The Talent Landscape</h2>
      <p>The tech industry continues to grow rapidly, creating unprecedented demand for skilled professionals. However, the supply of qualified candidates hasn't kept pace, leading to intense competition for top talent.</p>

      <h2>Effective Recruitment Strategies</h2>
      <h3>1. Employer Branding</h3>
      <p>Develop a strong employer brand that showcases your company culture, values, and opportunities for growth. Use social media, company blogs, and employee testimonials to attract candidates.</p>

      <h3>2. Diverse Sourcing</h3>
      <p>Don't limit your search to traditional channels. Use LinkedIn, GitHub, Stack Overflow, tech meetups, and university partnerships to find candidates.</p>

      <h3>3. Skills-Based Assessment</h3>
      <p>Focus on practical skills rather than just credentials. Use coding challenges, portfolio reviews, and problem-solving exercises to evaluate candidates.</p>

      <h2>Development and Growth</h2>
      <p>Once you have great people on your team, investing in their development is crucial for retention and performance.</p>

      <h3>1. Continuous Learning</h3>
      <p>Provide opportunities for ongoing skill development through conferences, workshops, online courses, and internal knowledge sharing sessions.</p>

      <h3>2. Career Pathing</h3>
      <p>Create clear career progression paths with defined roles, responsibilities, and advancement criteria. Help employees see their future with your organization.</p>

      <h3>3. Mentorship Programs</h3>
      <p>Pair junior team members with experienced mentors to accelerate learning and integration into the team culture.</p>

      <h2>Retention Best Practices</h2>
      <p>Keeping top talent requires more than competitive salaries—it demands a supportive and engaging work environment.</p>

      <h3>1. Work-Life Balance</h3>
      <p>Respect boundaries between work and personal life. Offer flexible schedules, remote work options, and generous time off policies.</p>

      <h3>2. Recognition and Rewards</h3>
      <p>Implement both formal and informal recognition programs. Celebrate achievements, milestones, and contributions regularly.</p>

      <h3>3. Competitive Compensation</h3>
      <p>Regularly review and adjust compensation to remain competitive in the market. Consider both salary and benefits packages.</p>

      <h2>Team Culture and Collaboration</h2>
      <p>High-performance teams thrive in environments that foster collaboration and mutual respect.</p>

      <h3>1. Open Communication</h3>
      <p>Encourage honest feedback and open dialogue. Create channels for sharing ideas, concerns, and suggestions.</p>

      <h3>2. Psychological Safety</h3>
      <p>Build an environment where team members feel safe taking risks, asking questions, and admitting mistakes.</p>

      <h3>3. Team Building</h3>
      <p>Regular team building activities help strengthen relationships and improve collaboration. Consider both virtual and in-person options.</p>

      <h2>Measuring Team Performance</h2>
      <p>Use metrics to track team effectiveness and identify areas for improvement:</p>
      <ul>
        <li>Project delivery timelines and quality</li>
        <li>Employee satisfaction and engagement scores</li>
        <li>Retention rates and turnover</li>
        <li>Individual and team productivity metrics</li>
        <li>Innovation and improvement initiatives</li>
      </ul>

      <p>Building high-performance teams is an ongoing process that requires commitment from leadership and active participation from all team members. The investment in people development and team culture pays dividends in productivity, innovation, and long-term success.</p>
    `,
    author: "Emma Davis",
    date: "2024-01-08",
    readTime: "7 min read",
    category: "Team Building",
    image: "/placeholder-blog.jpg",
    featured: false,
    tags: ["team building", "talent acquisition", "retention", "leadership", "culture"]
  },
  {
    id: 5,
    title: "Security Best Practices for Modern Teams",
    excerpt: "Essential security measures every team should implement to protect their data and workflows.",
    content: `
      <p>In an increasingly digital world, security is not just an IT concern—it's a team-wide responsibility. Modern teams handle sensitive data, collaborate across networks, and use various tools, making comprehensive security practices essential for protecting both company and client information.</p>

      <h2>Understanding Modern Security Threats</h2>
      <p>Cyber threats have evolved significantly, with attackers using sophisticated techniques to breach systems and steal data. Teams must stay informed about current threats and implement appropriate defenses.</p>

      <h2>Essential Security Practices</h2>
      <h3>1. Password Management</h3>
      <p>Strong passwords are the first line of defense. Implement policies requiring complex passwords, regular updates, and password managers for secure storage.</p>

      <h3>2. Multi-Factor Authentication (MFA)</h3>
      <p>Enable MFA wherever possible. This adds an extra layer of security that makes unauthorized access much more difficult, even if passwords are compromised.</p>

      <h3>3. Data Encryption</h3>
      <p>Ensure sensitive data is encrypted both in transit and at rest. Use HTTPS for all web communications and encrypt stored data using industry-standard algorithms.</p>

      <h2>Access Control and Permissions</h2>
      <p>Implement the principle of least privilege—give team members only the access they need to perform their jobs.</p>

      <h3>1. Role-Based Access Control (RBAC)</h3>
      <p>Define clear roles and assign permissions based on job responsibilities. Regularly review and update permissions as team members' roles change.</p>

      <h3>2. Regular Audits</h3>
      <p>Conduct periodic access audits to ensure permissions are appropriate and remove access for former employees immediately.</p>

      <h3>3. Session Management</h3>
      <p>Implement automatic session timeouts and require re-authentication for sensitive operations.</p>

      <h2>Secure Communication</h2>
      <p>Teams communicate constantly, and these channels need to be secure.</p>

      <h3>1. Encrypted Channels</h3>
      <p>Use end-to-end encrypted messaging platforms for sensitive discussions. Avoid sharing sensitive information through unsecured channels.</p>

      <h3>2. File Sharing Security</h3>
      <p>Use secure file sharing platforms with access controls, encryption, and audit trails for shared documents.</p>

      <h3>3. Email Security</h3>
      <p>Train team members to recognize phishing attempts and use email encryption for sensitive communications.</p>

      <h2>Device and Network Security</h2>
      <p>With remote and hybrid work models, device and network security is more important than ever.</p>

      <h3>1. Device Management</h3>
      <p>Implement mobile device management (MDM) policies and require security software on all work devices.</p>

      <h3>2. Network Security</h3>
      <p>Use VPNs for public Wi-Fi connections and implement firewall rules to protect internal networks.</p>

      <h3>3. Software Updates</h3>
      <p>Keep all software and operating systems updated with the latest security patches.</p>

      <h2>Incident Response Planning</h2>
      <p>Even with the best security measures, incidents can occur. Being prepared is crucial.</p>

      <h3>1. Response Team</h3>
      <p>Designate team members responsible for security incident response and ensure they receive appropriate training.</p>

      <h3>2. Response Procedures</h3>
      <p>Document clear procedures for identifying, containing, and recovering from security incidents.</p>

      <h3>3. Communication Plans</h3>
      <p>Have plans for communicating with team members, clients, and authorities during security incidents.</p>

      <h2>Training and Awareness</h2>
      <p>Security is everyone's responsibility, and regular training is essential.</p>

      <h3>1. Security Training</h3>
      <p>Conduct regular security awareness training covering topics like phishing recognition, password security, and data handling.</p>

      <h3>2. Phishing Simulations</h3>
      <p>Regularly test team members with simulated phishing attacks to reinforce training and identify areas needing improvement.</p>

      <h3>3. Policy Communication</h3>
      <p>Ensure all team members understand security policies and their responsibilities in maintaining security.</p>

      <h2>Monitoring and Compliance</h2>
      <p>Continuous monitoring helps identify and respond to security issues quickly.</p>

      <h3>1. Security Monitoring</h3>
      <p>Implement tools to monitor for unusual activity, unauthorized access attempts, and potential security breaches.</p>

      <h3>2. Compliance Requirements</h3>
      <p>Understand and comply with relevant regulations like GDPR, HIPAA, or industry-specific security standards.</p>

      <h3>3. Regular Assessments</h3>
      <p>Conduct regular security assessments, penetration testing, and vulnerability scans.</p>

      <p>Implementing comprehensive security practices requires commitment from the entire team. Start with foundational practices like strong passwords and MFA, then gradually implement more advanced measures. Remember that security is an ongoing process that requires regular review and updates to stay effective against evolving threats.</p>
    `,
    author: "David Kim",
    date: "2024-01-05",
    readTime: "4 min read",
    category: "Security",
    image: "/placeholder-blog.jpg",
    featured: false,
    tags: ["security", "cybersecurity", "data protection", "best practices", "compliance"]
  },
  {
    id: 6,
    title: "Agile vs Waterfall: Choosing the Right Methodology",
    excerpt: "A comprehensive comparison of project management methodologies to help you choose the best approach for your team.",
    content: `
      <p>Choosing the right project management methodology can significantly impact your team's success. Two of the most popular approaches are Agile and Waterfall, each with distinct characteristics, advantages, and use cases. Understanding when to use each methodology is crucial for project success.</p>

      <h2>Understanding the Methodologies</h2>
      <h3>Waterfall Methodology</h3>
      <p>Waterfall is a traditional, linear approach to project management where each phase must be completed before moving to the next. The project flows downward like a waterfall through distinct stages.</p>

      <h3>Agile Methodology</h3>
      <p>Agile is an iterative, flexible approach that emphasizes collaboration, customer feedback, and rapid adaptation. Work is completed in short cycles called sprints, allowing for continuous improvement.</p>

      <h2>Key Differences</h2>
      <h3>Project Structure</h3>
      <ul>
        <li><strong>Waterfall:</strong> Linear, sequential phases with clear boundaries</li>
        <li><strong>Agile:</strong> Iterative cycles with flexible scope and frequent adjustments</li>
      </ul>

      <h3>Requirements Handling</h3>
      <ul>
        <li><strong>Waterfall:</strong> Requirements defined upfront and remain mostly unchanged</li>
        <li><strong>Agile:</strong> Requirements evolve based on customer feedback and changing needs</li>
      </ul>

      <h3>Team Involvement</h3>
      <ul>
        <li><strong>Waterfall:</strong> Specialized roles with clear divisions of responsibility</li>
        <li><strong>Agile:</strong> Cross-functional teams with high collaboration</li>
      </ul>

      <h2>When to Use Waterfall</h2>
      <p>Waterfall methodology works best in certain scenarios:</p>
      <ul>
        <li><strong>Clear Requirements:</strong> When project requirements are well-defined and unlikely to change</li>
        <li><strong>Regulatory Compliance:</strong> Industries with strict regulatory requirements (healthcare, government, finance)</li>
        <li><strong>Fixed Budget and Timeline:</strong> When budget and deadlines are non-negotiable</li>
        <li><strong>Simple Projects:</strong> Straightforward projects with predictable outcomes</li>
        <li><strong>Client Preference:</strong> When clients prefer traditional project management approaches</li>
      </ul>

      <h2>When to Use Agile</h2>
      <p>Agile methodology excels in dynamic environments:</p>
      <ul>
        <li><strong>Complex Projects:</strong> Projects with high complexity and uncertainty</li>
        <li><strong>Changing Requirements:</strong> When requirements are likely to evolve during development</li>
        <li><strong>Innovation Focus:</strong> Projects requiring creative solutions and experimentation</li>
        <li><strong>Customer-Centric:</strong> When close customer collaboration is essential</li>
        <li><strong>Technology Projects:</strong> Software development and digital product creation</li>
        <li><strong>Competitive Markets:</strong> Industries requiring rapid adaptation to market changes</li>
      </ul>

      <h2>Hybrid Approaches</h2>
      <p>Many teams find that a hybrid approach works best, combining elements of both methodologies:</p>
      <ul>
        <li><strong>Agile Waterfall:</strong> Using Waterfall for planning and Agile for execution</li>
        <li><strong>Wagile:</strong> Waterfall planning with Agile-inspired flexibility</li>
        <li><strong>Custom Hybrids:</strong> Tailored approaches based on specific project needs</li>
      </ul>

      <h2>Implementation Considerations</h2>
      <h3>For Waterfall:</h3>
      <ul>
        <li>Ensure thorough requirements gathering before starting</li>
        <li>Establish clear milestones and deliverables</li>
        <li>Plan for comprehensive testing at each phase</li>
        <li>Prepare detailed documentation throughout the process</li>
        <li>Consider the impact of any changes on the entire project timeline</li>
      </ul>

      <h3>For Agile:</h3>
      <ul>
        <li>Build cross-functional, self-organizing teams</li>
        <li>Establish clear sprint cycles and ceremonies</li>
        <li>Implement tools for backlog management and progress tracking</li>
        <li>Encourage regular customer feedback and involvement</li>
        <li>Focus on delivering working software frequently</li>
      </ul>

      <h2>Making the Decision</h2>
      <p>When choosing between Agile and Waterfall, consider:</p>
      <ol>
        <li><strong>Project Complexity:</strong> More complex projects often benefit from Agile's flexibility</li>
        <li><strong>Team Experience:</strong> Consider your team's familiarity with each methodology</li>
        <li><strong>Client Expectations:</strong> Some clients prefer the predictability of Waterfall</li>
        <li><strong>Timeline Constraints:</strong> Waterfall provides more predictable timelines</li>
        <li><strong>Budget Flexibility:</strong> Agile allows for scope adjustments, Waterfall requires fixed scope</li>
      </ol>

      <h2>Measuring Success</h2>
      <p>Regardless of the methodology chosen, success should be measured by:</p>
      <ul>
        <li>Project delivery on time and within budget</li>
        <li>Customer satisfaction with the final product</li>
        <li>Team satisfaction and engagement</li>
        <li>Quality of deliverables</li>
        <li>Ability to adapt to changes</li>
      </ul>

      <p>The choice between Agile and Waterfall isn't always binary. Many successful teams use elements of both approaches or adapt methodologies to fit their specific needs. The key is understanding the strengths and limitations of each approach and choosing the one that best serves your project's unique requirements.</p>
    `,
    author: "Lisa Garcia",
    date: "2024-01-03",
    readTime: "10 min read",
    category: "Methodology",
    image: "/placeholder-blog.jpg",
    featured: false,
    tags: ["agile", "waterfall", "methodology", "project management", "team processes"]
  },
]

export default function BlogPostPage() {
  const params = useParams()
  const [copied, setCopied] = useState(false)

  const postId = parseInt(params.id as string)
  const post = blogPosts.find(p => p.id === postId)

  if (!post) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800">
        <div className="container mx-auto px-4 py-8 max-w-4xl">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Blog Post Not Found
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mb-8">
              The blog post you're looking for doesn't exist.
            </p>
            <Button asChild>
              <Link href="/blog">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Blog
              </Link>
            </Button>
          </div>
        </div>
      </div>
    )
  }

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(window.location.href)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const shareOnTwitter = () => {
    const url = encodeURIComponent(window.location.href)
    const text = encodeURIComponent(`Check out: ${post.title}`)
    window.open(`https://twitter.com/intent/tweet?url=${url}&text=${text}`, '_blank')
  }

  const shareOnFacebook = () => {
    const url = encodeURIComponent(window.location.href)
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank')
  }

  const shareOnLinkedIn = () => {
    const url = encodeURIComponent(window.location.href)
    const title = encodeURIComponent(post.title)
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, '_blank')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <Button variant="ghost" asChild className="mb-6">
            <Link href="/blog">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Blog
            </Link>
          </Button>

          <div className="text-center space-y-4 mb-8">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Badge variant="outline">{post.category}</Badge>
              {post.featured && <Badge variant="secondary">Featured</Badge>}
            </div>

            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 dark:text-white leading-tight">
              {post.title}
            </h1>

            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
              {post.excerpt}
            </p>

            <div className="flex items-center justify-center gap-6 text-gray-500 dark:text-gray-400">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4" />
                <span>{post.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>{new Date(post.date).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>{post.readTime}</span>
              </div>
            </div>

            <div className="flex items-center justify-center gap-2 pt-4">
              <span className="text-sm text-gray-500 dark:text-gray-400">Share:</span>
              <Button variant="outline" size="sm" onClick={copyToClipboard}>
                {copied ? (
                  <Check className="h-4 w-4 text-green-600" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </Button>
              <Button variant="outline" size="sm" onClick={shareOnTwitter}>
                <Twitter className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm" onClick={shareOnFacebook}>
                <Facebook className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm" onClick={shareOnLinkedIn}>
                <Linkedin className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Featured Image */}
        <div className="mb-12">
          <div className="aspect-video bg-muted relative rounded-lg overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-600 opacity-20" />
            <div className="absolute inset-0 flex items-center justify-center">
              <BookOpen className="h-24 w-24 text-white" />
            </div>
          </div>
        </div>

        {/* Article Content */}
        <article className="prose prose-lg dark:prose-invert max-w-none mb-12">
          <div
            className="text-gray-700 dark:text-gray-300 leading-relaxed"
            dangerouslySetInnerHTML={{
              __html: post.content.replace(/\n/g, '<br>')
            }}
          />
        </article>

        {/* Tags */}
        <div className="mb-12">
          <div className="flex items-center gap-2 mb-4">
            <Tag className="h-5 w-5 text-gray-500 dark:text-gray-400" />
            <span className="font-medium text-gray-900 dark:text-white">Tags:</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <Badge key={tag} variant="outline" className="capitalize">
                {tag}
              </Badge>
            ))}
          </div>
        </div>

        {/* Author Card */}
        <Card className="mb-12">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center">
                <User className="h-8 w-8" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {post.author}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Author • {new Date(post.date).toLocaleDateString()}
                </p>
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                {post.readTime}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Newsletter CTA */}
        <Card className="border-0 shadow-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white mb-12">
          <CardContent className="p-8 text-center">
            <h3 className="text-2xl font-bold mb-4">
              Stay Updated with Our Latest Insights
            </h3>
            <p className="text-lg mb-6 opacity-90">
              Get weekly articles, tips, and industry insights delivered to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder:text-white/70 focus:outline-none focus:ring-2 focus:ring-white/50"
              />
              <Button variant="secondary" size="lg">
                Subscribe
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Back to Blog */}
        <div className="text-center">
          <Button variant="outline" asChild>
            <Link href="/blog">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to All Articles
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
