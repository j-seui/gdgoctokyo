document.addEventListener("DOMContentLoaded", () => {
    // 현재 탭에 코드 주입 → window.getSelection().toString()
    chrome.tabs.query({ active: true, currentWindow: true }, ([tab]) => {
      chrome.scripting.executeScript(
        {
          target: { tabId: tab.id },
          func: () => window.getSelection().toString()
        },
        ([{ result: selectedText }]) => {
          const box = document.getElementById("text");
  
          if (selectedText && selectedText.trim()) {
            box.textContent = selectedText.trim();
            box.classList.remove("placeholder");
  
            // 필요하다면 다시 저장해 두기
            chrome.storage.local.set({ selectedText: selectedText.trim() });
          } else {
            // 선택이 없을 경우 "텍스트를 선택해 주세요." 표시
            chrome.storage.local.get("selectedText", ({ selectedText }) => {
            selectedText = "리뷰를 드래그해서 선택하세요.";
            box.textContent = selectedText;

            chrome.storage.local.set({ selectedText });
            });
          }
        }
      );
    });
  });
  