/* global use, db */
// MongoDB Playground
// To disable this template go to Settings | MongoDB | Use Default Template For Playground.
// Make sure you are connected to enable completions and to be able to run a playground.
// Use Ctrl+Space inside a snippet or a string literal to trigger completions.
// The result of the last command run in a playground is shown on the results panel.
// By default the first 20 documents will be returned with a cursor.
// Use 'console.log()' to print to the debug output.
// For more documentation on playgrounds please refer to
// https://www.mongodb.com/docs/mongodb-vscode/playgrounds/

const { desc } = require("motion/react-client");

// Select the database to use.
use('Portfolio');

db.getCollection('projects').deleteMany({});
db.getCollection('education').deleteMany({});

db.getCollection('projects').insertMany([
	{
		title: 'ImageProc',
		description:
			'ImageProc is a command-line tool built in Java for batch processing images using a number of modular effects that filter, modify, create, and combine said images. It allows for a complex tree syntax for branching processing paths and usies parallel processing to increase efficiency of image modification.',
		image_link: 'image.png',
		link: 'https://github.com/xaridar/image-proc',
		technologies: ['Java'],
	},
	{
		title: 'WordAround',
		description:
			'WordAround is a web-based Wordle-inspired game built in vanilla JavaScript. It plays on the idea of Wordle by instead placing words in a circle, with the goal of racking up a high score by guessing words consecutively.',
		image_link: 'wordaround.png',
		link: 'https://xaridar.github.io/WordAround',
		technologies: ['HTML', 'CSS', 'JavaScript', 'Express', 'Node.js', 'NPM'],
	},
	{
		title: 'VisualSickness',
		description:
			'As part of my research in VR at TCNJ, I helped develop VisualSickness, a web-based repository for the collection and sharing of questionnaire data in cybersickness studies.',
		image_link: 'vis_sickness.png',
		link: 'https://github.com/sharifshahnewaz/VisualsicknessPHP',
		for: 'TCNJ VR Lab',
		technologies: ['PHP', 'MySQL', 'jQuery', 'Bootstrap', 'HTML', 'CSS'],
	},
	{
		title: 'LScript',
		description:
			'A self-designed language with a corresponding interpeter written in Java, supporting static typing, control structures, object-oriented programming, and wide built-in functionality. Inspired by [CodePulse](https://www.youtube.com/watch?v=Eythq9848Fg&list=PLZQftyCk7_SdoVexSmwy_tBgs7P0b97yD)',
		image_link: 'lscript.png',
		link: 'https://github.com/xaridara/LScript',
		technologies: ['Java'],
	},
	{
		title: 'Dungeon of Curses',
		description:
			'Winner of the HackTCNJ 2022 Hackathon, Dungeon of Curses is a top-down ASCII-based roguelike, written in Python using the ncurses library. All content is procedularly generated through public API calls, and it runs entire in the command-line. Global high-scores are tracked using a Node.js server with PostgreSQL.',
		image_link: 'doc.png',
		link: 'https://github.com/wdylanbibb/HackTCNJ2022',
		technologies: ['PostGreSQL', 'Express', 'Node.js', 'Python'],
	},
	{
		title: 'Next.js Portfolio',
		description: 'Portfolio website built in Next.js to showcase design and development skills.',
		image_link: 'portfolio.png',
		link: 'https://github.com/xaridar',
		technologies: [
			'Next.js',
			'MongoDB',
			'Mongoose',
			'Yarn',
			'TypeScript',
			'React',
			'Tailwind CSS',
			'Feather Icons',
		],
	},
	{
		title: 'RAT',
		technologies: ['Node.js', 'NPM', 'CSS']
	},
	{
		title: 'LOD Calculator',
		description: ,
		for: 'National Institute of Standards and Technology (NIST)',
		image_link: 'lod_calc.png',
		link: 'https://github.com/xaridar/LOD-Calculator',
		technologies: ['Flask', 'Python', 'jQuery', 'Bootstrap', 'HTML']
	},
	{
		title: 'Statistical App Generator',
		description: ,
		for: 'National Institute of Standards and Technology (NIST)',
		image_link: 'sag.png',
		link: 'https://github.com/xaridar/StatisticalAppGenerator',
		technologies: ['Flask', 'Python', 'jQuery', 'Bootstrap', 'HTML']
	},
	{
		title: 'ModVA',
		technologies: ['Python']
	},
	{
		title: 'Bullseye',
		technologies: ['Android', 'Java', 'SQLite']
	},
	{
		title: 'Notable',
		technologies: ['Android', 'Java', 'Firebase']
	},
	{
		title: "List n' Learn",
		technologies: ['MongoDB', 'Mongoose', 'Express', 'React', 'Node.js', 'CSS', 'FontAwesome']
	}
]);

db.getCollection('education').insertMany([
	{
		school: 'The College of New Jersey (TCNJ)',
		degree: 'BS in Computer Science, minor in Interactive Multimedia',
		gpa: 3.99,
		involvements: [
			'TCNJ Japanese Student Assocation: Fundraising Co-chair 2022-23',
			'TCNJ Japanese Student Assocation: Treasurer 2023-24',
			'TCNJ Japanese Student Assocation: President 2024-25',
			'Upsilon Pi Epsilon Delta Chapter of NJ: Secretary 2023-24',
			'Upsilon Pi Epsilon Delta Chapter of NJ: Vice President 2024-25',
		],
		technologies: ['Ruby', 'Ruby on Rails', 'Redis', 'MATLAB', 'C', 'C++', 'C#', 'Unity', 'Java', 'Git', 'GitHub', 'HTML', 'CSS', 'JavaScript']
	}
]);
