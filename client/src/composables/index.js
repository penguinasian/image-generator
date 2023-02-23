import { surpriseMePrompts } from '../constants/index.js';

export const useGenerateRandomPrompt = (prompt) => { 
    const randomIndex = Math.floor(Math.random() * surpriseMePrompts.length);
    
    const randomPrompt = surpriseMePrompts[randomIndex];

    console.log('randomPrompt', randomPrompt)

    if (randomPrompt == prompt) {
        return useGenerateRandomPrompt();
    }

    return randomPrompt;
}