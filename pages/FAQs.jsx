import React from "react";

export default function FAQs() {
  const faqs = [
    {
      question: "What is Mesa Verde and what can I do on this platform?",
      answer:
        "Mesa Verde is your unified banking portal that lets you view and manage all your bank accounts in one place. Think of it as your financial command center. As Kim Wexler would say — simple, efficient, and 100% compliant.",
    },
    {
      question: "How do I open a new bank account?",
      answer:
        'Go to the "Open Account" section, fill out your details, select a bank and branch, and submit your request. If all checks pass, your account opens faster than Silver Chariot.',
    },
    {
      question: "Can I close an existing account?",
      answer:
        "Yes. Visit the Close Account page, enter your credentials and account details, and submit the request. Our system ensures the account belongs to you before processing closure.",
    },
    {
      question: "How do I transfer funds between accounts?",
      answer:
        "Use the Transfer Funds feature to move money between any of your accounts—even across different banks. Like a Stand user sensing another Stand user, we automatically validate your accounts.",
    },
    {
      question: "Why can't I select a branch before selecting a bank?",
      answer:
      "Branches belong to specific banks, so the bank must be selected first. Like Django can't aim unless he knows exactly where he's pointing.",
    },
    {
      question: "Is my data secure?",
      answer:
        "Yes. All requests are encrypted and authenticated via JWT. No loopholes that even Saul Goodman could find.",
    },
    {
      question: "I forgot my password. What do I do?",
      answer:
        'Click the "Forgot Password?" link on the login page to receive a secure reset link.',
    },
    {
      question: "Why is my transaction marked as pending?",
      answer:
        'Some transactions take time to verify. Yare yare daze… good things take time.',
    },
    {
      question: "Can I use Mesa Verde on my phone?",
      answer:
        "Yes! The site is fully responsive and works smoothly on all modern devices.",
    },
    {
      question: "How do I contact support?",
      answer:
        "Visit the Contact Us page. Our team is faster than Star Platinum at resolving issues.",
    },
  ];

  return (
    <div className="container my-5">
      <h2 className="mb-4 text-center fw-bold">Frequently Asked Questions</h2>

      <div className="accordion" id="faqAccordion">
        {faqs.map((faq, index) => (
          <div className="accordion-item" key={index}>
            <h2 className="accordion-header">
              <button
                className="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target={`#faq${index}`}
              >
                {faq.question}
              </button>
            </h2>

            <div
              id={`faq${index}`}
              className="accordion-collapse collapse"
              data-bs-parent="#faqAccordion"
            >
              <div className="accordion-body">{faq.answer}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
