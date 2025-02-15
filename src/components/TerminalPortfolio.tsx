// Types
interface TerminalEntry {
  type: 'input' | 'output';
  content: string;
}

interface Command {
  description: string;
  execute: () => string;
}

interface Commands {
  [key: string]: Command;
}

// Component
import React, { useState, useEffect, useRef, type FormEvent } from 'react';
import { Terminal } from 'lucide-react';

const TerminalPortfolio: React.FC<{ closeHandler: () => void }> = ({ closeHandler }) => {
    const [input, setInput] = useState<string>('');
    const [history, setHistory] = useState<TerminalEntry[]>([]);
    const [currentDirectory, setCurrentDirectory] = useState<string>('~');
    const inputRef = useRef<HTMLInputElement>(null);
    const terminalRef = useRef<HTMLDivElement>(null);

    const commands: Commands = {
        help: {
            description: 'List all available commands',
            execute: () => `Available commands:
- about: Display professional summary
- skills: List technical skills
- experience: Show work experience
- contact: Get contact information
- clear: Clear terminal
- exit: Close terminal
- help: Show this help message`,
        },
        about: {
            description: 'Display professional summary',
            execute: () => `Vinu Varghese
Technical Architect & Digital Transformation Leader

A seasoned Technical Architect with extensive experience in enterprise solutions,
cloud architecture, and AI implementation. Specializing in designing scalable,
cloud-native solutions and driving digital transformation initiatives.

Location: Trivandrum, India
Current Focus: Enterprise Architecture & AI Solutions`,
        },
        skills: {
            description: 'List technical skills',
            execute: () => `Technical Skills:

▪ Architecture & Design
    - Enterprise Architecture
    - Cloud Architecture (AWS, Azure, GCP)
    - Software Architecture
    - Microservices
    - Distributed Systems

▪ Technologies
    - Cloud Native Solutions
    - AI/ML Platforms
    - Container Orchestration
    - DevOps & CI/CD
    - Infrastructure as Code

▪ Leadership
    - Technical Leadership
    - Solution Design
    - Digital Transformation
    - Technology Strategy
    - Team Mentorship`,
        },
        experience: {
            description: 'Show work experience',
            execute: () => `Professional Experience:

Technical Architect
• Leading enterprise-wide digital transformation initiatives
• Designing cloud-native solutions and AI implementations
• Developing technology strategy and roadmaps

Senior Solutions Architect
• Architected scalable cloud solutions
• Led technical teams and projects
• Implemented AI/ML solutions`,
    },
    contact: {
      description: 'Get contact information',
      execute: () => `Contact Information:

Email: vinu [at] vinuvarghese [dot] com
LinkedIn: https://www.linkedin.com/in/vinuvarghese/
GitHub: https://github.com/vinu
Website: vinuvarghese.com`,
    },
    clear: {
      description: 'Clear terminal',
      execute: () => {
        setTimeout(() => {
            setHistory([
                { type: 'output', content: `Welcome to vinuvarghese.com\nType 'help' to see available commands.` }
            ]);
        });    
        
        return '';
      },
    },
    exit: {
        description: 'Close terminal',
        execute: () => {
            closeHandler();
            return '';
        },
    }
  };

  const handleCommand = (cmd: string): string => {
    const trimmedCmd = cmd.trim().toLowerCase();
    if (trimmedCmd === '') return '';
    
    if (commands[trimmedCmd]) {
      return commands[trimmedCmd].execute();
    }
    
    return `Command not found: ${cmd}. Type 'help' for available commands.`;
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const output = handleCommand(input);
    setHistory([...history, { type: 'input', content: `${currentDirectory} $ ${input}` }]);
    if (output) {
      setHistory([...history, 
        { type: 'input', content: `${currentDirectory} $ ${input}` },
        { type: 'output', content: output }
      ]);
    }
    setInput('');
  };

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);

  useEffect(() => {
    setHistory([
      { type: 'output', content: `Welcome to vinuvarghese.com
Type 'help' to see available commands.

` }
    ]);
  }, []);

  return (
    <div className="min-h-screen bg-black text-green-500 p-4 font-mono">
      <div className="max-w-4xl mx-auto">
        <div className="bg-gray-900 rounded-lg shadow-lg overflow-hidden">
          {/* Terminal Header */}
          <div className="bg-gray-800 px-4 py-2 flex items-center">
            <div className="flex space-x-2">
              <div className="w-3 h-3 rounded-full bg-red-500" onClick={closeHandler}></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
            <div className="flex-1 text-center text-gray-400">
              <Terminal className="inline mr-2" size={16} />
              terminal@vinuvarghese.com
            </div>
          </div>
          
          {/* Terminal Body */}
          <div 
            ref={terminalRef}
            className="p-4 h-96 overflow-y-auto"
          >
            {history.map((entry, index) => (
              <div key={index} className="mb-2">
                <pre className="whitespace-pre-wrap font-mono">
                  {entry.content}
                </pre>
              </div>
            ))}
            
            <form onSubmit={handleSubmit} className="flex">
              <span className="mr-2">{currentDirectory} $</span>
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="flex-1 bg-transparent outline-none"
                autoFocus
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TerminalPortfolio;