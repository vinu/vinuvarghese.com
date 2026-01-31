import React, { useState, useEffect, useRef, type FormEvent, type KeyboardEvent } from 'react';
import { Terminal } from 'lucide-react';

// ── Types ────────────────────────────────────────────────────────────────────

interface TerminalEntry {
  type: 'input' | 'output';
  content: string;
}

interface FsNode {
  type: 'file' | 'dir';
  content?: string;
  children?: Record<string, FsNode>;
  size?: number;
}

// ── Virtual Filesystem ───────────────────────────────────────────────────────

const filesystem: FsNode = {
  type: 'dir',
  children: {
    'about.txt': {
      type: 'file',
      size: 582,
      content: `Vinu Varghese
Technical Architect | Cloud & AI Solutions Expert

Technical Architect with 20+ years of proven experience designing
and implementing enterprise-scale solutions at the intersection
of innovation and practical business outcomes.

Expert in cloud computing (AWS, Azure), artificial intelligence,
and full-stack development with comprehensive expertise spanning
application development, database administration, and system
architecture.

Demonstrated success leading cross-functional teams, driving
digital transformation initiatives, and delivering scalable,
cloud-native solutions that reduce costs and improve performance.

Location: Thiruvananthapuram, Kerala, India
Current Focus: Cloud Architecture, AI Solutions & Enterprise Systems`,
    },
    'contact.txt': {
      type: 'file',
      size: 248,
      content: `Contact Information

  Email:     vinu@vinuvarghese.com
  LinkedIn:  linkedin.com/in/vinuvarghese
  GitHub:    github.com/vinu
  Stack:     stackoverflow.com/users/674067
  Website:   www.vinuvarghese.com
  Location:  Thiruvananthapuram, Kerala, India`,
    },
    skills: {
      type: 'dir',
      children: {
        'languages.txt': {
          type: 'file',
          size: 64,
          content: `Programming Languages

  Java / J2EE
  Python
  PHP
  Rust
  Node.js
  TypeScript`,
        },
        'frameworks.txt': {
          type: 'file',
          size: 98,
          content: `Frameworks & Libraries

  React / React Native
  Next.js
  Angular
  NestJS
  Spring Framework
  Django
  Express.js`,
        },
        'cloud.txt': {
          type: 'file',
          size: 82,
          content: `Cloud & DevOps

  AWS (EC2, S3, Lambda)
  Azure Cloud Services
  Docker / Kubernetes
  CI/CD Pipelines
  Terraform
  Infrastructure as Code`,
        },
        'architecture.txt': {
          type: 'file',
          size: 91,
          content: `Architecture & Design

  Microservices Architecture
  RESTful API Design
  System Design Patterns
  Distributed Systems
  Event-Driven Architecture`,
        },
        'databases.txt': {
          type: 'file',
          size: 52,
          content: `Database Technologies

  Oracle / MySQL
  PostgreSQL
  MongoDB
  Redis
  Database Administration`,
        },
        'ai.txt': {
          type: 'file',
          size: 74,
          content: `AI & Advanced Tech

  Machine Learning
  AI Integration
  Data Analytics
  Natural Language Processing
  Intelligent Systems`,
        },
      },
    },
    experience: {
      type: 'dir',
      children: {
        'technical-architect.txt': {
          type: 'file',
          size: 487,
          content: `Technical Architect
Xminds Infotech Pvt Ltd | Trivandrum
Jan 2010 - Present (15+ years)

Lead architect responsible for designing and implementing
scalable enterprise solutions spanning cloud computing,
AI integration, and full-stack development.

Key Achievements:
  * Architected cloud-native solutions on AWS and Azure
  * Led microservices migration (40% scalability improvement)
  * Designed AI-driven business process automation
  * Established DevOps practices and CI/CD pipelines
  * Mentored teams in Java, Python, React`,
        },
        'team-lead.txt': {
          type: 'file',
          size: 198,
          content: `Team Lead
Pollenizer India | Trivandrum
2009 - Mar 2011 (2 years)

Led large development teams at a startup incubator,
driving product delivery and technical decision-making.

Key Achievements:
  * Led cross-functional development teams
  * Managed end-to-end project delivery`,
        },
        'senior-engineer.txt': {
          type: 'file',
          size: 352,
          content: `Senior Software Engineer
Xminds Infotech Pvt Ltd | Trivandrum
Apr 2006 - Jan 2010 (4 years)

Developed and maintained complex software systems for
online money transfers and chat applications.

Key Achievements:
  * Secure payment processing systems
  * Real-time chat with WebSocket protocols
  * Security best practices for financial apps
  * Led code reviews and coding standards`,
        },
        'lecturer.txt': {
          type: 'file',
          size: 234,
          content: `Lecturer, Computer Science
University of Kerala
Aug 2000 - Mar 2006 (6 years)

Taught computer science courses covering software
development, system administration, and database
management.

Key Achievements:
  * Software development & database courses
  * Mentored students in emerging technologies`,
        },
      },
    },
  },
};

// ── Path Helpers ─────────────────────────────────────────────────────────────

function resolvePath(currentPath: string[], target: string): string[] {
  let segments: string[];

  if (target.startsWith('~/')) {
    segments = target.slice(2).split('/').filter(Boolean);
  } else if (target === '~') {
    return ['~'];
  } else {
    segments = [...currentPath.slice(1), ...target.split('/').filter(Boolean)];
  }

  const resolved: string[] = [];
  for (const seg of segments) {
    if (seg === '..') {
      resolved.pop();
    } else if (seg !== '.') {
      resolved.push(seg);
    }
  }

  return ['~', ...resolved];
}

function getNode(path: string[]): FsNode | null {
  let node = filesystem;
  for (const seg of path.slice(1)) {
    if (node.type !== 'dir' || !node.children || !node.children[seg]) {
      return null;
    }
    node = node.children[seg];
  }
  return node;
}

function getPathString(path: string[]): string {
  return path.length === 1 ? '~' : path.join('/');
}

function getAllFileContents(node: FsNode, prefix: string): { path: string; content: string }[] {
  const results: { path: string; content: string }[] = [];
  if (node.type === 'file' && node.content) {
    results.push({ path: prefix, content: node.content });
  } else if (node.type === 'dir' && node.children) {
    for (const [name, child] of Object.entries(node.children)) {
      results.push(...getAllFileContents(child, prefix ? `${prefix}/${name}` : name));
    }
  }
  return results;
}

function buildTree(node: FsNode, name: string, prefix: string, isLast: boolean): string {
  const connector = isLast ? '└── ' : '├── ';
  const lines = [prefix + connector + name + (node.type === 'dir' ? '/' : '')];
  if (node.type === 'dir' && node.children) {
    const entries = Object.entries(node.children);
    entries.forEach(([childName, childNode], i) => {
      const childIsLast = i === entries.length - 1;
      const childPrefix = prefix + (isLast ? '    ' : '│   ');
      lines.push(...buildTree(childNode, childName, childPrefix, childIsLast).split('\n'));
    });
  }
  return lines.join('\n');
}

// ── Command names for tab completion ─────────────────────────────────────────

const COMMAND_NAMES = [
  'ls', 'cd', 'pwd', 'cat', 'tree', 'grep',
  'whoami', 'hostname', 'uname', 'date', 'echo', 'history', 'man',
  'open', 'help', 'clear', 'exit', 'neofetch', 'sudo', 'rm', 'vim', 'nano',
];

const OPEN_TARGETS: Record<string, string> = {
  github: 'https://github.com/vinu',
  linkedin: 'https://www.linkedin.com/in/vinuvarghese/',
  email: 'mailto:vinu@vinuvarghese.com',
  stackoverflow: 'https://stackoverflow.com/users/674067/jang00',
  website: 'https://www.vinuvarghese.com',
};

// ── Welcome Banner ───────────────────────────────────────────────────────────

const WELCOME_BANNER = ` __     ___              __     __              _
 \\ \\   / (_)_ __  _   _  \\ \\   / /_ _ _ __ __ _| |__   ___  ___  ___
  \\ \\ / /| | '_ \\| | | |  \\ \\ / / _\` | '__/ _\` | '_ \\ / _ \\/ __|/ _ \\
   \\ V / | | | | | |_| |   \\ V / (_| | | | (_| | | | |  __/\\__ \\  __/
    \\_/  |_|_| |_|\\__,_|    \\_/ \\__,_|_|  \\__, |_| |_|\\___||___/\\___|
                                           |___/

  Technical Architect | Cloud & AI Solutions Expert
  Type 'help' for available commands. Tab for autocomplete.
`;

// ── Man Pages ────────────────────────────────────────────────────────────────

const MAN_PAGES: Record<string, string> = {
  ls: `LS(1)                     User Commands                     LS(1)

NAME
    ls - list directory contents

SYNOPSIS
    ls [OPTION] [PATH]

OPTIONS
    -l    long listing format
    -la   long listing including hidden info

DESCRIPTION
    List files and directories. Directories shown in blue.`,

  cd: `CD(1)                     User Commands                     CD(1)

NAME
    cd - change the working directory

SYNOPSIS
    cd [DIR]

DESCRIPTION
    Change current directory to DIR. With no DIR, changes to ~.
    Supports relative paths, '..' for parent, and '~/' prefix.`,

  cat: `CAT(1)                    User Commands                    CAT(1)

NAME
    cat - display file contents

SYNOPSIS
    cat FILE

DESCRIPTION
    Read and display the contents of FILE to standard output.`,

  grep: `GREP(1)                   User Commands                   GREP(1)

NAME
    grep - search files for a pattern

SYNOPSIS
    grep PATTERN

DESCRIPTION
    Search all files in the portfolio for lines matching PATTERN.
    Results shown with file paths and matching lines.`,

  open: `OPEN(1)                   User Commands                   OPEN(1)

NAME
    open - open a link in browser

SYNOPSIS
    open TARGET

TARGETS
    github, linkedin, email, stackoverflow, website

DESCRIPTION
    Opens the specified link in a new browser tab.`,

  tree: `TREE(1)                   User Commands                   TREE(1)

NAME
    tree - list contents of directories in a tree-like format

SYNOPSIS
    tree

DESCRIPTION
    Recursively display the directory structure as a tree.`,
};

// ── Component ────────────────────────────────────────────────────────────────

const TerminalPortfolio: React.FC<{ closeHandler: () => void }> = ({ closeHandler }) => {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<TerminalEntry[]>([]);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [savedInput, setSavedInput] = useState('');
  const [currentPath, setCurrentPath] = useState<string[]>(['~']);
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);

  const prompt = `vinu@vinuvarghese.com:${getPathString(currentPath)}$ `;

  // ── Command Handlers ─────────────────────────────────────────────────────

  const handleCommand = (raw: string): string => {
    const trimmed = raw.trim();
    if (!trimmed) return '';

    const parts = trimmed.split(/\s+/);
    const cmd = parts[0].toLowerCase();
    const args = parts.slice(1);

    // Easter eggs first
    if (cmd === 'sudo') return 'Nice try ;)';
    if (trimmed === 'rm -rf /' || trimmed === 'rm -rf ~') return 'Permission denied: Cannot destroy portfolio';
    if (cmd === 'rm') return 'rm: operation not permitted (read-only filesystem)';
    if (cmd === 'vim' || cmd === 'nano' || cmd === 'vi' || cmd === 'emacs') return `${cmd}: this portfolio is read-only`;
    if (cmd === 'touch' || cmd === 'mkdir' || cmd === 'mv' || cmd === 'cp') return `${cmd}: read-only filesystem`;

    switch (cmd) {
      case 'help':
        return `Available commands:

  Filesystem:
    ls [path]      List directory contents
    ls -l [path]   Long listing format
    cd [dir]       Change directory
    pwd            Print working directory
    cat <file>     Display file contents
    tree           Show directory tree
    grep <term>    Search all files

  System:
    whoami         Display current user
    hostname       Display hostname
    uname -a       System information
    date           Current date & time
    echo <text>    Print text
    history        Command history
    man <cmd>      Manual page for command

  Portfolio:
    open <target>  Open link (github, linkedin, email, stackoverflow, website)

  Terminal:
    clear          Clear terminal
    exit           Close terminal
    help           Show this help message`;

      case 'ls':
        return handleLs(args);

      case 'cd':
        return handleCd(args);

      case 'pwd':
        return getPathString(currentPath).replace('~', '/home/vinu');

      case 'cat':
        return handleCat(args);

      case 'tree':
        return handleTree();

      case 'grep':
        return handleGrep(args);

      case 'whoami':
        return 'vinu';

      case 'hostname':
        return 'vinuvarghese.com';

      case 'uname':
        if (args.includes('-a')) {
          return 'Linux vinuvarghese.com 6.1.0-portfolio #1 SMP x86_64 GNU/Linux';
        }
        return 'Linux';

      case 'date':
        return new Date().toString();

      case 'echo':
        return args.join(' ');

      case 'history':
        return handleHistory();

      case 'man':
        return handleMan(args);

      case 'open':
        return handleOpen(args);

      case 'neofetch':
        return handleNeofetch();

      case 'clear':
        setTimeout(() => setHistory([]));
        return '';

      case 'exit':
        closeHandler();
        return '';

      default:
        return `${cmd}: command not found. Type 'help' for available commands.`;
    }
  };

  // ── ls ─────────────────────────────────────────────────────────────────

  const handleLs = (args: string[]): string => {
    const longFormat = args.includes('-l') || args.includes('-la') || args.includes('-al');
    const pathArg = args.find((a) => !a.startsWith('-'));
    const targetPath = pathArg ? resolvePath(currentPath, pathArg) : currentPath;
    const node = getNode(targetPath);

    if (!node) return `ls: cannot access '${pathArg}': No such file or directory`;
    if (node.type === 'file') return pathArg || '';

    const entries = Object.entries(node.children || {}).sort(([, a], [, b]) => {
      if (a.type === b.type) return 0;
      return a.type === 'dir' ? -1 : 1;
    });

    if (longFormat) {
      const lines = [`total ${entries.length}`];
      for (const [name, child] of entries) {
        const isDir = child.type === 'dir';
        const perms = isDir ? 'drwxr-xr-x' : '-rw-r--r--';
        const size = isDir
          ? Object.keys(child.children || {}).length.toString().padStart(5)
          : (child.size || 0).toString().padStart(5);
        const date = 'Jan 31 2026';
        const displayName = isDir ? `\x1b[34m${name}/\x1b[0m` : name;
        lines.push(`${perms}  1 vinu vinu ${size} ${date} ${displayName}`);
      }
      return lines.join('\n');
    }

    return entries
      .map(([name, child]) => (child.type === 'dir' ? `${name}/` : name))
      .join('  ');
  };

  // ── cd ─────────────────────────────────────────────────────────────────

  const handleCd = (args: string[]): string => {
    if (args.length === 0 || args[0] === '~') {
      setCurrentPath(['~']);
      return '';
    }

    const target = args[0];
    const newPath = resolvePath(currentPath, target);
    const node = getNode(newPath);

    if (!node) return `cd: ${target}: No such file or directory`;
    if (node.type !== 'dir') return `cd: ${target}: Not a directory`;

    setCurrentPath(newPath);
    return '';
  };

  // ── cat ────────────────────────────────────────────────────────────────

  const handleCat = (args: string[]): string => {
    if (args.length === 0) return 'cat: missing file operand';
    const target = args[0];
    const targetPath = resolvePath(currentPath, target);
    const node = getNode(targetPath);

    if (!node) return `cat: ${target}: No such file or directory`;
    if (node.type === 'dir') return `cat: ${target}: Is a directory`;

    return node.content || '';
  };

  // ── tree ───────────────────────────────────────────────────────────────

  const handleTree = (): string => {
    const node = getNode(currentPath);
    if (!node || node.type !== 'dir') return 'tree: not a directory';

    const lines = [getPathString(currentPath)];
    const entries = Object.entries(node.children || {});
    entries.forEach(([name, child], i) => {
      const isLast = i === entries.length - 1;
      lines.push(buildTree(child, name, '', isLast));
    });

    const dirCount = entries.filter(([, n]) => n.type === 'dir').length;
    const fileCount = entries.reduce((count, [, n]) => {
      if (n.type === 'file') return count + 1;
      if (n.type === 'dir' && n.children) return count + Object.keys(n.children).length;
      return count;
    }, 0);
    lines.push(`\n${dirCount} directories, ${fileCount} files`);

    return lines.join('\n');
  };

  // ── grep ───────────────────────────────────────────────────────────────

  const handleGrep = (args: string[]): string => {
    if (args.length === 0) return 'grep: missing search pattern';
    const pattern = args.join(' ').toLowerCase();
    const allFiles = getAllFileContents(filesystem, '~');
    const results: string[] = [];

    for (const file of allFiles) {
      const lines = file.content.split('\n');
      for (const line of lines) {
        if (line.toLowerCase().includes(pattern)) {
          results.push(`${file.path}: ${line.trim()}`);
        }
      }
    }

    if (results.length === 0) return `No matches found for '${args.join(' ')}'`;
    return results.join('\n');
  };

  // ── history ────────────────────────────────────────────────────────────

  const handleHistory = (): string => {
    if (commandHistory.length === 0) return 'No commands in history';
    return commandHistory.map((cmd, i) => `  ${(i + 1).toString().padStart(4)}  ${cmd}`).join('\n');
  };

  // ── man ────────────────────────────────────────────────────────────────

  const handleMan = (args: string[]): string => {
    if (args.length === 0) return 'What manual page do you want?\nFor example, try \'man ls\'';
    const page = MAN_PAGES[args[0].toLowerCase()];
    if (page) return page;
    return `No manual entry for ${args[0]}`;
  };

  // ── open ───────────────────────────────────────────────────────────────

  const handleOpen = (args: string[]): string => {
    if (args.length === 0) {
      return `Usage: open <target>\nTargets: ${Object.keys(OPEN_TARGETS).join(', ')}`;
    }
    const target = args[0].toLowerCase();
    const url = OPEN_TARGETS[target];
    if (!url) return `open: unknown target '${target}'\nAvailable: ${Object.keys(OPEN_TARGETS).join(', ')}`;
    window.open(url, '_blank');
    return `Opening ${target}...`;
  };

  // ── neofetch ───────────────────────────────────────────────────────────

  const handleNeofetch = (): string => {
    return `        .--.          vinu@vinuvarghese.com
       |o_o |         ────────────────────────
       |:_/ |         OS:      Portfolio Linux x86_64
      //   \\ \\        Host:    vinuvarghese.com
     (|     | )       Kernel:  6.1.0-portfolio
    /'\\_   _/\`\\       Uptime:  20+ years
    \\___)=(___/       Shell:   portfolio-sh 1.0
                      Role:    Technical Architect
                      Company: Xminds Infotech
                      DE:      Astro + React + Tailwind
                      Lang:    Java, Python, Rust, TS
                      Cloud:   AWS, Azure, Docker/K8s
                      Focus:   Cloud Architecture & AI`;
  };

  // ── Tab Completion ─────────────────────────────────────────────────────

  const handleTabComplete = (): void => {
    const parts = input.split(/\s+/);

    if (parts.length <= 1) {
      // Complete command name
      const partial = parts[0].toLowerCase();
      const matches = COMMAND_NAMES.filter((c) => c.startsWith(partial));
      if (matches.length === 1) {
        setInput(matches[0] + ' ');
      } else if (matches.length > 1) {
        setHistory((prev) => [
          ...prev,
          { type: 'input', content: `${prompt}${input}` },
          { type: 'output', content: matches.join('  ') },
        ]);
      }
      return;
    }

    // Complete file/dir path
    const cmd = parts[0];
    const partial = parts[parts.length - 1];
    const lastSlash = partial.lastIndexOf('/');
    let dirPart: string;
    let filePart: string;

    if (lastSlash >= 0) {
      dirPart = partial.slice(0, lastSlash) || '.';
      filePart = partial.slice(lastSlash + 1);
    } else {
      dirPart = '.';
      filePart = partial;
    }

    const targetPath = dirPart === '.' ? currentPath : resolvePath(currentPath, dirPart);
    const node = getNode(targetPath);

    if (!node || node.type !== 'dir' || !node.children) return;

    const matches = Object.entries(node.children)
      .filter(([name]) => name.toLowerCase().startsWith(filePart.toLowerCase()))
      .map(([name, child]) => (child.type === 'dir' ? name + '/' : name));

    if (matches.length === 1) {
      const prefix = lastSlash >= 0 ? partial.slice(0, lastSlash + 1) : '';
      const completed = prefix + matches[0];
      setInput([cmd, ...parts.slice(1, -1), completed].join(' '));
    } else if (matches.length > 1) {
      setHistory((prev) => [
        ...prev,
        { type: 'input', content: `${prompt}${input}` },
        { type: 'output', content: matches.join('  ') },
      ]);
    }
  };

  // ── Key Handlers ───────────────────────────────────────────────────────

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === 'Tab') {
      e.preventDefault();
      handleTabComplete();
      return;
    }

    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length === 0) return;
      if (historyIndex === -1) {
        setSavedInput(input);
      }
      const newIndex = historyIndex === -1 ? commandHistory.length - 1 : Math.max(0, historyIndex - 1);
      setHistoryIndex(newIndex);
      setInput(commandHistory[newIndex]);
      return;
    }

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex === -1) return;
      if (historyIndex >= commandHistory.length - 1) {
        setHistoryIndex(-1);
        setInput(savedInput);
      } else {
        const newIndex = historyIndex + 1;
        setHistoryIndex(newIndex);
        setInput(commandHistory[newIndex]);
      }
      return;
    }
  };

  // ── Submit ─────────────────────────────────────────────────────────────

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const trimmed = input.trim();

    if (trimmed) {
      setCommandHistory((prev) => [...prev, trimmed]);
    }
    setHistoryIndex(-1);
    setSavedInput('');

    const output = handleCommand(input);
    if (output) {
      setHistory((prev) => [
        ...prev,
        { type: 'input', content: `${prompt}${input}` },
        { type: 'output', content: output },
      ]);
    } else if (trimmed) {
      setHistory((prev) => [
        ...prev,
        { type: 'input', content: `${prompt}${input}` },
      ]);
    }
    setInput('');
  };

  // ── Effects ────────────────────────────────────────────────────────────

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);

  useEffect(() => {
    setHistory([{ type: 'output', content: WELCOME_BANNER }]);
  }, []);

  // Click on terminal body refocuses input
  const handleBodyClick = () => {
    inputRef.current?.focus();
  };

  // ── Render ─────────────────────────────────────────────────────────────

  return (
    <div className="bg-black text-green-500 p-4 font-mono">
      <div className="max-w-4xl mx-auto">
        <div className="bg-gray-900 rounded-lg shadow-lg overflow-hidden border border-white/10">
          {/* Terminal Header */}
          <div className="bg-gray-800 px-4 py-2 flex items-center">
            <div className="flex space-x-2">
              <button
                onClick={closeHandler}
                className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-400 transition-colors"
                aria-label="Close terminal"
              />
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <div className="w-3 h-3 rounded-full bg-green-500" />
            </div>
            <div className="flex-1 text-center text-gray-400 text-sm">
              <Terminal className="inline mr-2" size={14} />
              vinu@vinuvarghese.com: {getPathString(currentPath)}
            </div>
          </div>

          {/* Terminal Body */}
          <div
            ref={terminalRef}
            className="p-4 h-[28rem] overflow-y-auto cursor-text"
            onClick={handleBodyClick}
          >
            {history.map((entry, index) => (
              <div key={index} className="mb-1">
                <pre className="whitespace-pre-wrap font-mono text-sm leading-relaxed">
                  {entry.content}
                </pre>
              </div>
            ))}

            <form onSubmit={handleSubmit} className="flex text-sm">
              <span className="mr-1 shrink-0 text-green-400">{prompt}</span>
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                className="flex-1 bg-transparent outline-none caret-green-400"
                autoFocus
                spellCheck={false}
                autoComplete="off"
                autoCorrect="off"
                autoCapitalize="off"
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TerminalPortfolio;
