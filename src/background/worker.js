// src/background/worker.js
console.log("Background script loaded");

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'summarize') {
    const formattedMessage = formatMessage(message.data);
    summarizeCommitMessages(formattedMessage)
      .then(summary => {
        sendResponse({
          success: true,
          summary: summary
        });
      })
      .catch(error => {
        sendResponse({
          success: false,
          error: error.message
        });
      });
    
    return true;
  }
});

function formatMessage(messages) {
  console.log(messages);
  return messages.map(msg => `- ${msg}`).join('\n');
}

async function summarizeCommitMessages(messages) {
  let summarizer;
  const options = {
    sharedContext: `
    You are given a bullet point list of Git commit messages that describe code changes for a pull request. 
    
    Your task: 
    Summarize the set of commits into a single, short, descriptive pull request title.  
    The title should:
    - Clearly reflect the main purpose or change described across the commits  
    - Be in plain, readable English  
    - Start with a capital letter  
    - Use present tense (e.g., "Add", "Fix", "Update")  
    - Avoid unnecessary words like "This PR" or "Commit messages"  
    - Be no longer than a short sentence (ideally under 15 words)  
    
    Examples of good PR titles:
    - "Add user authentication flow to the login page to enable users to log in"
    - "Fix bug in dropdown menu causing it to display incorrect options"
    - "Optimize database queries to improve dashboard load times"
    
    Examples of bad PR titles:
    - "Misc changes" (too vague)  
    - "This PR adds login flow" ("This PR" is redundant)  
    - "Add logins, fix bug, update UI" (too many unrelated points — choose the main theme)
    
    Output only the generated pull request title — do not include explanations, bullet points, or commit text.
    `,
    type: 'headline',
    format: 'plain-text',
    length: 'short',
  };

  const availability = await Summarizer.availability();

  if (availability === "unavailable") {
    throw new Error("Summarizer is not available");
  }
  else if (availability === 'available') {
    summarizer = await Summarizer.create(options);
  }
  else {
    summarizer = await Summarizer.create(options);
    summarizer.addEventListener('downloadprogress', (e) => {
      console.log(`Downloaded ${e.loaded * 100}%`);
    });
    await summarizer.ready;
  }
  const summary = await summarizer.summarize(messages);
  console.log(summary);
  summarizer.destroy();

  return summary;
}

export {};
