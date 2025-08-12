// src/content/script.ts
console.log("Hello from content script");

const titleInput = document.getElementById('pull_request_title');
if (titleInput) {
  const generateButton = document.createElement('button');
  generateButton.type = 'button';
  generateButton.textContent = 'Generate';
  generateButton.style.position = 'absolute';
  generateButton.style.top = '50%';
  generateButton.style.transform = 'translateY(-50%)';
  generateButton.style.right = '0';
  generateButton.style.padding = '2px 8px';
  generateButton.style.marginRight = '8px';
  generateButton.style.borderRadius = '0.4rem';
  generateButton.style.backgroundColor = '#0074D9';
  generateButton.style.color = '#fff';
  generateButton.style.border = 'none';
  generateButton.onclick = () => {
    generateButton.textContent = '...';
    generateButton.disabled = true;
    generateButton.style.backgroundColor = '#90CAF9';
    getPullRequestTitle(getCommitMessages()).then((title) => {
      titleInput.value = title;
      generateButton.textContent = 'Generate';
      generateButton.disabled = false;
      generateButton.style.backgroundColor = '#0074D9';
    });
  };
  titleInput.parentNode.insertBefore(generateButton, titleInput.nextSibling);
}


function getCommitMessages() {
    const commitMessages = document.querySelectorAll("p.mb-1 > a.markdown-title");
    return Array.from(commitMessages).map((commitMessage) => commitMessage.textContent);
}

async function getPullRequestTitle(messages) {
  try {
      const response = await chrome.runtime.sendMessage({
        action: 'summarize',
        data: messages
      });

      console.log('Processed result:', response.summary);
      return response.summary;
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
}