import { Code2, Cloud, Brain, Github, Linkedin, Mail, ChevronDown } from 'lucide-react';

function App() {
  const scrollToPassions = () => {
    const passionsSection = document.getElementById('passions');
    if (passionsSection) {
      passionsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section with Animated Background */}
      <div className="relative h-screen">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(17,24,39,1),rgba(0,0,0,1))]" />
        <div className="absolute inset-0">
          <div className="h-full w-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMSkiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-20" />
        </div>
        
        {/* Content */}
        <div className="relative h-full flex flex-col items-center justify-center px-4">
          <img
            src="/profile.png"
            alt="Vinu Varghese"
            className="w-32 h-32 rounded-full border-2 border-blue-500 shadow-lg shadow-blue-500/20 mb-8 object-cover"
          />
          <h1 className="text-6xl font-bold mb-4 text-center">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
              Vinu Varghese
            </span>
          </h1>
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-[1px] bg-blue-500/50" />
            <h2 className="text-xl text-gray-400 font-light tracking-wider">TECHNOLOGY ARCHITECT</h2>
            <div className="w-12 h-[1px] bg-blue-500/50" />
          </div>
          
          {/* Social Links */}
          <div className="flex gap-6 mb-16">
            <a href="https://github.com/vinu" className="group">
              <div className="bg-white/5 hover:bg-white/10 p-3 rounded-full transition-all duration-300 border border-white/10 hover:border-blue-500/50">
                <Github className="w-6 h-6 group-hover:text-blue-400 transition-colors" />
              </div>
            </a>
            <a href="https://www.linkedin.com/in/vinuvarghese/" className="group">
              <div className="bg-white/5 hover:bg-white/10 p-3 rounded-full transition-all duration-300 border border-white/10 hover:border-blue-500/50">
                <Linkedin className="w-6 h-6 group-hover:text-blue-400 transition-colors" />
              </div>
            </a>
            <a href="mailto:vinu@vinuvarghese.com" className="group">
              <div className="bg-white/5 hover:bg-white/10 p-3 rounded-full transition-all duration-300 border border-white/10 hover:border-blue-500/50">
                <Mail className="w-6 h-6 group-hover:text-blue-400 transition-colors" />
              </div>
            </a>
            <a href="https://stackoverflow.com/users/674067/jang00" className="group">
              <div className="bg-white/5 hover:bg-white/10 p-3 rounded-full transition-all duration-300 border border-white/10 hover:border-blue-500/50">
                <svg 
                  viewBox="0 0 24 24" 
                  className="w-6 h-6 group-hover:text-blue-400 transition-colors"
                  fill="currentColor"
                >
                  <path d="M17.36 20.2v-5.38h1.79L19.5 12h-1.79V10.3c0-.89.44-1.75 1.84-1.75h1.42V6.13s-1.29-.22-2.52-.22c-2.57 0-4.25 1.56-4.25 4.38V12h-2.86v2.82h2.86v5.38h3.16z"/>
                  <path d="M15.86 0H2.14C.96 0 0 .96 0 2.14v15.72C0 19.04.96 20 2.14 20h15.72c1.18 0 2.14-.96 2.14-2.14V2.14C20 .96 19.04 0 17.86 0zM16 14.5h-2.5v6h-3v-6H8v-2.5h2.5V9.74C10.5 7.37 11.93 6 14.1 6c1.17 0 2.4.2 2.4.2v2.13h-1.35c-1.33 0-1.75.83-1.75 1.67V12H16l-.5 2.5z"/>
                </svg>
              </div>
            </a>
          </div>
          
          {/* Scroll Indicator */}
          <button 
            onClick={scrollToPassions}
            className="absolute bottom-8 group cursor-pointer bg-transparent border-none focus:outline-none"
            aria-label="Scroll to passions section"
          >
            <div className="p-3 rounded-full transition-all duration-300 hover:bg-white/5">
              <ChevronDown className="w-6 h-6 text-blue-500 animate-bounce group-hover:text-blue-400" />
            </div>
          </button>
        </div>
      </div>

      {/* Passions Section */}
      <div id="passions" className="max-w-6xl mx-auto px-4 py-24 scroll-mt-8">
        <h2 className="text-3xl font-bold text-center mb-16">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">
            My Passions
          </span>
        </h2>
        
        <div className="grid md:grid-cols-3 gap-8">
          <div className="group relative">
            <div className="absolute inset-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl blur opacity-30 group-hover:opacity-100 transition duration-500" />
            <div className="relative bg-black p-8 rounded-2xl h-full border border-white/10">
              <Code2 className="w-12 h-12 text-blue-400 mb-6" />
              <h3 className="text-xl font-bold mb-4 group-hover:text-blue-400 transition-colors">Coding</h3>
              <p className="text-gray-400 leading-relaxed">
                Crafting elegant solutions through clean, efficient code. Passionate about building scalable and maintainable software architectures.
              </p>
            </div>
          </div>
          
          <div className="group relative">
            <div className="absolute inset-0.5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl blur opacity-30 group-hover:opacity-100 transition duration-500" />
            <div className="relative bg-black p-8 rounded-2xl h-full border border-white/10">
              <Cloud className="w-12 h-12 text-purple-400 mb-6" />
              <h3 className="text-xl font-bold mb-4 group-hover:text-purple-400 transition-colors">Cloud</h3>
              <p className="text-gray-400 leading-relaxed">
                Designing and implementing robust cloud architectures. Expert in distributed systems and cloud-native solutions.
              </p>
            </div>
          </div>
          
          <div className="group relative">
            <div className="absolute inset-0.5 bg-gradient-to-r from-pink-500 to-blue-500 rounded-2xl blur opacity-30 group-hover:opacity-100 transition duration-500" />
            <div className="relative bg-black p-8 rounded-2xl h-full border border-white/10">
              <Brain className="w-12 h-12 text-pink-400 mb-6" />
              <h3 className="text-xl font-bold mb-4 group-hover:text-pink-400 transition-colors">AI</h3>
              <p className="text-gray-400 leading-relaxed">
                Exploring the frontiers of artificial intelligence and machine learning. Building intelligent systems that solve real-world problems.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* About Section */}
      <div className="max-w-4xl mx-auto px-4 pb-24">
        <div className="relative">
          <div className="absolute inset-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl blur opacity-30" />
          <div className="relative bg-black/50 backdrop-blur-xl p-8 rounded-2xl border border-white/10">
            <h2 className="text-2xl font-bold mb-6">About Me</h2>
            <p className="text-gray-300 leading-relaxed">
              As a Technology Architect, I thrive at the intersection of innovation and practical solutions. 
              With a deep understanding of modern technologies and architectural patterns, I help organizations 
              navigate their digital transformation journey. My expertise spans across cloud computing, 
              artificial intelligence, and software development, allowing me to create holistic solutions 
              that drive business value while maintaining technical excellence.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;