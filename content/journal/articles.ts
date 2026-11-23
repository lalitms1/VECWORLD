export type JournalSection = { heading: string; paragraphs?: string[]; bullets?: string[]; note?: string };
export type JournalArticle = {
  slug: string; title: string; deck: string; category: string; readingTime: string;
  metaDescription: string; introduction: string; sections: JournalSection[]; takeaway: string;
};

export const articles: JournalArticle[] = [
  {
    slug: 'why-experiences-stay',
    title: 'Why Children Remember Experiences More Than Explanations',
    deck: 'An idea becomes easier to remember when a learner has something meaningful to connect it to—not just a sentence to repeat.',
    category: 'Memory & Experience', readingTime: '6 min read',
    metaDescription: 'Explore why meaningful experiences can support children’s memory, understanding and recall, with practical ways to connect explanations to action.',
    introduction: 'Think about a child learning that a shadow changes when an object moves. One route is to say the fact and ask the child to repeat it. Another is to let the child move a torch, place a toy in front of it and watch the shadow shift. The second route gives the idea an event, a question and a result. That difference matters.',
    sections: [
      { heading: 'Memory needs more than exposure', paragraphs: ['Hearing information is not the same as building a usable memory. A child may repeat a sentence immediately after hearing it but struggle to explain it later or recognise it in a new situation. Repetition can be useful, but repetition without meaning often produces fragile recall.', 'An experience can provide several connected cues: what the child saw, what they did, what changed, what they expected and what surprised them. Later, one cue may help bring the rest of the event—and the idea within it—back to mind.'] },
      { heading: 'Action gives an idea a context', paragraphs: ['When children sort objects, build a tower, compare two leaves or measure water in different containers, they meet a concept inside a particular situation. The situation helps answer an important question: “When would I use this?”', 'The action does not automatically guarantee learning. A child can be busy without thinking deeply. The adult’s role is to help connect the action to the idea with a well-timed question: “What changed?”, “How do you know?”, or “What might happen if we try again?”'] },
      { heading: 'A useful cycle: do, notice, explain, revisit', paragraphs: ['A simple learning cycle can turn an enjoyable activity into a stronger understanding. First, let the child try something. Next, pause to notice the result. Invite the child to describe what happened in their own words. Then revisit the idea later in a slightly different setting.', 'For example, after sorting buttons by colour, sort them by size. Ask what stayed the same and what changed. The child now has to retrieve the earlier idea of grouping and adapt it, rather than merely repeat a definition.'] },
      { heading: 'How adults can make experiences memorable', bullets: ['Give the activity a clear purpose: solve a small problem, answer a question or make something work.', 'Keep the number of new ideas manageable. One meaningful discovery is often better than a rushed collection of facts.', 'Ask children to predict before revealing the result.', 'Invite them to explain, draw, demonstrate or teach the idea back.', 'Return to the concept after a gap, using a new example rather than repeating the exact same task.'] },
    ],
    takeaway: 'Do not ask only, “Did the child enjoy the activity?” Ask, “What did the child notice, explain and remember afterwards?” Enjoyment opens the door; reflection and revisiting help the learning travel beyond the moment.'
  },
  {
    slug: 'storytelling-abstract-concepts',
    title: 'How Storytelling Makes Abstract Concepts Easier to Understand',
    deck: 'A story can give an unfamiliar idea a purpose, a sequence and consequences that learners can follow.',
    category: 'Story & Understanding', readingTime: '7 min read',
    metaDescription: 'Learn how storytelling can make abstract ideas more understandable through context, cause and effect, character goals and carefully guided explanation.',
    introduction: '“A force can change an object’s motion” is a useful statement, but it may feel distant to a young learner. A story about a child trying to move a stuck cart gives the same idea a reason to matter. The learner wants to know what will happen, what might help and why one attempt works better than another.',
    sections: [
      { heading: 'Stories create a reason to care', paragraphs: ['An abstract concept often has no obvious emotional or practical meaning when introduced by itself. Story supplies a situation: someone wants something, encounters a difficulty and needs to make sense of what is happening.', 'The learner is no longer receiving an isolated fact. They are following a question. That question gives attention a direction and makes the concept relevant to the moment.'] },
      { heading: 'Sequence makes relationships visible', paragraphs: ['A good learning story has understandable cause and effect. Something happens, a character responds, a result follows, and the character adjusts. This sequence can help learners notice relationships that are otherwise difficult to see.', 'For example, a story about a plant that droops can invite questions about water, sunlight and the conditions needed for growth. The story should not pretend that one simple event explains every biological process. It should create a starting point for observation and a more careful explanation.'] },
      { heading: 'Characters are not substitutes for concepts', paragraphs: ['A character can wonder, make a prediction or misunderstand something. But the character should not simply announce the answer while the learner watches passively. The strongest moment is often when the learner has enough clues to anticipate the discovery.', 'Keep the story focused. Too many characters, side quests or unrelated facts can compete with the idea. A clear goal and one central discovery make it easier to follow the learning thread.'] },
      { heading: 'A practical design pattern', bullets: ['Begin with a meaningful question or problem.', 'Show the learner what the character can observe—not just what the narrator says.', 'Let the character test an idea and see a consequence.', 'Pause for a prediction or comparison.', 'Name the concept after the experience has made it relevant.', 'Offer a fresh everyday example so the learner can transfer the idea.'] },
    ],
    takeaway: 'Storytelling is not decoration wrapped around a lesson. Used carefully, it is a structure for attention and reasoning. The story earns attention; observation and explanation make the learning accurate.'
  },
  {
    slug: 'mathematics-through-discovery',
    title: 'Making Mathematics Interesting Through Discovery',
    deck: 'Mathematics becomes more inviting when children can see a pattern, test a strategy and explain why it works.',
    category: 'Mathematics', readingTime: '7 min read',
    metaDescription: 'Practical ways to make mathematics meaningful through patterns, real quantities, puzzles, estimation and children’s own strategies.',
    introduction: 'A child arranging 12 buttons into equal groups is already meeting mathematical ideas: quantity, grouping, equality and repeated addition. The numbers are not floating on a page. They describe something the child can move, compare and reorganise.',
    sections: [
      { heading: 'Start with a question, not a worksheet', paragraphs: ['A useful mathematical question creates a small puzzle. “Can we share these 12 objects equally between three people?” gives the child a purpose. They can try, notice what remains and decide whether each person has the same amount.', 'The adult can then connect the action to mathematical language: equal groups, division, remainder. The vocabulary becomes a name for a relationship the child has begun to understand.'] },
      { heading: 'Let children see structure', paragraphs: ['Patterns help children notice that mathematics is organised. Arrange objects in rows, build repeating sequences, compare shapes or use a number line to show how far apart numbers are.', 'Ask questions that reveal structure: “What repeats?”, “How many more?”, “Can you make the same total another way?” These questions invite children to look for relationships instead of guessing an answer.'] },
      { heading: 'Value strategies, not only speed', paragraphs: ['Two children may solve the same problem in different ways. One may count every object; another may make groups; a third may use a known fact. Comparing strategies helps learners see that mathematics is about reasoning, not simply speed.', 'Ask a child to show how they know. If the answer is incorrect, treat it as information about the strategy. “Show me what you tried” is often more useful than immediately giving the correct answer.'] },
      { heading: 'A simple discovery routine', bullets: ['Estimate first: ask what seems reasonable before counting or calculating.', 'Use objects, drawings or movement to represent the problem.', 'Invite more than one solution when possible.', 'Ask the child to explain the relationship they noticed.', 'Change one part of the problem and see whether the strategy still works.'] },
      { heading: 'Keep the sequence sensible', paragraphs: ['New mathematical ideas are easier to explore when the learner has the foundations they need. Counting and comparing quantities support addition; understanding addition as combining can prepare the way for multiplication as equal groups. The sequence should follow conceptual readiness, not just a list of topics.', 'Concrete materials are a bridge, not a permanent requirement. Over time, help children move from objects to drawings, diagrams, number sentences and mental reasoning.'] },
    ],
    takeaway: 'The goal is not to make every mathematics task look like a game. It is to make the mathematical thinking visible: noticing, estimating, representing, testing and explaining.'
  },
  {
    slug: 'observation-early-learning',
    title: 'Why Observation Matters in Early Learning',
    deck: 'Before a child can ask a thoughtful question, they need opportunities to notice what is actually there.',
    category: 'Observation', readingTime: '6 min read',
    metaDescription: 'Understand how observation supports early learning, language, comparison, curiosity and reasoning, with easy activities for home and school.',
    introduction: 'Two leaves may look almost identical at first. Look longer and a child might notice that one has a jagged edge, a lighter underside or a small hole. This is more than looking. It is careful attention—and it can become the beginning of a question.',
    sections: [
      { heading: 'Observation is an active skill', paragraphs: ['To observe is to attend to details, compare what is seen and distinguish evidence from a guess. Young children practise this whenever they notice a sound changing, identify a pattern, watch water flow or describe how a familiar object feels.', 'Observation is not limited to science. It supports reading pictures, recognising shapes, understanding social situations, following instructions and noticing changes in everyday routines.'] },
      { heading: 'Noticing comes before explaining', paragraphs: ['Children sometimes move quickly from seeing something to deciding why it happened. An adult can slow the process down without discouraging curiosity. Ask: “What did you see?” before “Why do you think it happened?”', 'This small distinction helps children separate what they know from what they suspect. It also makes room for more than one possible explanation, which is an important habit in thoughtful inquiry.'] },
      { heading: 'Observation builds language', paragraphs: ['Words such as rough, smooth, heavier, curved, louder, slower, transparent and damp help children describe differences precisely. A rich vocabulary gives them better tools for communicating what they notice.', 'Instead of correcting every description, offer a more precise word naturally: “You noticed that this stone feels rougher than the other one.” Then invite the child to find another example.'] },
      { heading: 'Small observation activities', bullets: ['Window watch: notice clouds, shadows or the movement of leaves at two different times.', 'Mystery bag: feel a safe object without looking and describe its shape, texture and weight.', 'Same and different: compare two everyday objects and find three similarities and three differences.', 'Sound pause: close your eyes for a moment and identify the different sounds in the room.', 'Change detective: observe a small plant or a melting ice cube and describe what changes over time.'] },
    ],
    takeaway: 'Give children time to look again. A patient “What else do you notice?” can be more powerful than supplying an answer too early.'
  },
  {
    slug: 'visual-storytelling-science',
    title: 'How Visual Storytelling Can Support Science Learning',
    deck: 'Images, models and sequences can make hidden processes easier to think about—when they are accurate and clearly explained.',
    category: 'Science & Visual Thinking', readingTime: '7 min read',
    metaDescription: 'Discover how visual models and storytelling support science learning while avoiding misleading simplifications and confusing imagery.',
    introduction: 'A learner cannot watch the particles in a glass of water with the naked eye. They can, however, explore a carefully designed model that represents how particles are arranged and move. Visuals can make an invisible process thinkable—but only if learners understand what the visual represents.',
    sections: [
      { heading: 'Science often asks us to imagine the unseen', paragraphs: ['Many scientific ideas involve processes too small, too large, too fast, too slow or too distant to observe directly. Models, diagrams, animations and demonstrations help us reason about these processes.', 'A model is not the thing itself. It is a representation built to explain selected features. A diagram of a cell, for example, is not a photograph of a cell at ordinary scale. It is a simplified view that helps identify structures and relationships.'] },
      { heading: 'A visual sequence can show change', paragraphs: ['A still image may show what something looks like. A sequence can show how it changes. For example, a sequence of the Sun appearing to move across the sky can lead into a discussion of Earth’s rotation—but the visual must be framed carefully so that apparent movement is not mistaken for the full physical explanation.', 'When an animation shows a process, narrate the important relationship rather than describing every movement on screen. Give learners time to predict what comes next and to explain the evidence.'] },
      { heading: 'Avoid the trap of beautiful but misleading visuals', paragraphs: ['A visually impressive animation can create confidence without creating understanding. If a model uses exaggerated sizes, simplified pathways or symbolic colours, make those choices clear when they matter.', 'Use more than one representation when possible: a real object, a drawing, a model and a verbal explanation. Ask what each representation helps us see—and what it leaves out.'] },
      { heading: 'A science visualisation checklist', bullets: ['Identify the scientific idea the visual is meant to explain.', 'Distinguish observed evidence from a model or imaginative reconstruction.', 'Keep scale, direction, sequence and cause-and-effect relationships as accurate as the learning goal requires.', 'Avoid adding decorative motion that implies a false scientific relationship.', 'Invite the learner to predict, pause, compare and explain—not just watch.'] },
    ],
    takeaway: 'The best science visual does not merely look impressive. It helps a learner form a better question, inspect a relationship and connect the model back to the real world.'
  },
  {
    slug: 'watching-vs-experiencing-learning',
    title: 'Watching Educational Videos vs Experiencing Learning',
    deck: 'A video can introduce an idea. Learning deepens when the viewer has a chance to think, respond, test and use it.',
    category: 'Active Learning', readingTime: '6 min read',
    metaDescription: 'Compare passive viewing with active learning and discover practical ways to turn educational videos into meaningful participation.',
    introduction: 'A child watches a video showing how a bridge holds weight. The animation is clear and the child enjoys it. But what happens next? If the child predicts which paper bridge will hold more coins, tests the idea and explains the result, watching has become the beginning of an experience.',
    sections: [
      { heading: 'Exposure is a beginning, not proof of learning', paragraphs: ['Watching can introduce vocabulary, provide examples and make a process visible. It can also help learners revisit something they have already explored. But a completed video does not tell us whether the learner understood, remembered or can apply the idea.', 'A child may recognise an answer when it appears on screen without being able to produce the answer independently. Recognition and recall are different demands. Both can be useful, but they should not be confused.'] },
      { heading: 'Participation changes the role of the viewer', paragraphs: ['Active learning asks the learner to do some thinking work: predict an outcome, answer a question, make a choice, compare two examples, draw a model or try a small experiment.', 'The activity need not be elaborate. A short pause to estimate, a conversation with a parent or a simple object-based test can make the learner’s thinking visible.'] },
      { heading: 'Design the bridge from screen to world', paragraphs: ['An educational video can end with a question that has a practical answer. If a story explores balance, invite the child to build a balanced arrangement with safe household objects. If it explores patterns, ask the child to find a pattern in tiles, leaves or clothing.', 'The follow-up should connect directly to the central idea. If it is unrelated, it may be entertaining but will not strengthen the intended learning.'] },
      { heading: 'A simple watch–pause–try–explain routine', bullets: ['Watch a short segment with one clear idea.', 'Pause before the answer and ask the learner to predict.', 'Try a related action, demonstration or choice away from the screen.', 'Ask the learner to explain what happened in their own words.', 'Return to the video or idea later and apply it in a new context.'] },
      { heading: 'What parents and educators can look for', paragraphs: ['Look beyond whether the child sat quietly or watched to the end. Can they describe the idea? Can they spot it somewhere else? Can they make a prediction or explain why an attempt did not work?', 'These are more useful signs of developing understanding than screen time alone. They also help adults decide whether to revisit the idea, offer a different example or move forward.'] },
    ],
    takeaway: 'A good educational video should not try to replace the world. It should help learners return to the world with sharper eyes, better questions and something meaningful to try.'
  },
];

export function getArticle(slug: string) { return articles.find((article) => article.slug === slug); }
