export interface LegalSection {
  title: string;
  paragraphs?: string[];
  items?: string[];
}

export interface LegalDoc {
  path: '/terms' | '/privacy';
  title: string;
  updated: string;
  summary: string;
  sections: LegalSection[];
}

const EMAIL = 'contact@zyniq.studio';

export const TERMS: LegalDoc = {
  path: '/terms',
  title: 'Terms of Service',
  updated: '18 October 2026',
  summary: 'The rules for using this website and for working with ZYNIQ Studio, our AI-driven software factory and innovation lab.',
  sections: [
    {
      title: 'Who we are',
      paragraphs: [
        'ZYNIQ Studio ("ZYNIQ", "we", "us") is an AI-driven software factory and innovation lab based in Dubai, United Arab Emirates. We design and build custom software, AI systems, automation and data platforms for businesses.',
        `These terms cover your use of this website and the free consultation we offer through it. Paid work is governed by a separate written agreement, described below. Questions about these terms can be sent to ${EMAIL}.`,
      ],
    },
    {
      title: 'Accepting these terms',
      paragraphs: [
        'By using this website or submitting a consultation request you agree to these terms. If you are using the website on behalf of a company, you confirm that you are authorised to bind that company. If you do not agree, please do not use the website.',
      ],
    },
    {
      title: 'Free consultation',
      paragraphs: [
        'A consultation request asks us to discuss your project. It is free and does not oblige either side to do any further work. A contract is formed only when both parties sign a proposal, statement of work or services agreement.',
        'A meeting time you choose in the form is a preference. It is not confirmed until we reply to you by email. We may propose a different time.',
        'Please do not send passwords, access keys, personal data about third parties, or other sensitive material in the form. Share that only after we have agreed how it will be protected.',
      ],
    },
    {
      title: 'Services and engagements',
      paragraphs: [
        'Each engagement is defined in a written agreement or statement of work (SOW) that sets out the scope, deliverables, timeline, fees and acceptance criteria. If an SOW conflicts with these terms, the SOW prevails for that engagement.',
        'Our services include software development, custom AI solutions, AI strategy and consulting, intelligent automation, back-end and cloud engineering, analytics, blockchain and Web3 development, AI integration, and AI staffing through ZYNIQ SYNTH. The descriptions on this website are summaries, not offers capable of acceptance.',
      ],
    },
    {
      title: 'Your responsibilities',
      items: [
        'Give us accurate and complete information, and timely access to the people, systems and data we need.',
        'Make sure you have the right to share any data, code, models or content you provide, and the right to let us use it to deliver the work.',
        'Review and test deliverables, and tell us promptly about any problem.',
        'Remain responsible for decisions you make using our work, including business, legal, financial and safety decisions.',
      ],
    },
    {
      title: 'AI-assisted work and AI output',
      paragraphs: [
        'Our software factory combines human engineers ("Commanders") with AI systems and specialist agents ("Crews"). Our Commanders review work before it ships, but AI-generated output is probabilistic. It can be incomplete, inaccurate or similar to other output.',
        'You should treat AI output as something to verify, not as advice you can rely on without checking. Unless the SOW says otherwise, we do not guarantee that AI models, agents or automations will be error-free, will reach any stated accuracy or success rate, or will behave identically over time as underlying models and APIs change.',
        'Figures shown on this website, such as task success rates or speed improvements, describe results observed in specific tests and projects. They are not guarantees of the results you will see.',
      ],
    },
    {
      title: 'Intellectual property',
      paragraphs: [
        'Subject to full payment and any terms in the SOW, you own the custom deliverables we create specifically for you, excluding the items below.',
        'We keep ownership of our pre-existing and general-purpose materials, including our tools, frameworks, templates, agent and crew configurations, prompts, libraries, methods and know-how, together with any improvements to them. Where such materials are part of a deliverable, we grant you a non-exclusive, worldwide, perpetual licence to use them as part of that deliverable.',
        'Third-party and open-source components stay under their own licences, which we will identify to you on request. You keep ownership of the data and materials you provide to us.',
        'The website, our name, our logo and our content are protected by intellectual property laws. You may not copy or reuse them without our written permission.',
      ],
    },
    {
      title: 'Confidentiality',
      paragraphs: [
        'Each party will keep the other\'s non-public business, technical and financial information confidential, use it only for the engagement, and protect it with reasonable care. This does not apply to information that is public through no fault of the receiving party, was already known to it, or must be disclosed by law. For sensitive projects we are happy to sign a mutual non-disclosure agreement before you share details.',
      ],
    },
    {
      title: 'Fees and payment',
      paragraphs: [
        'Fees, currency, invoicing and payment terms are set in the SOW. Unless stated otherwise, invoices are payable within 30 days, amounts exclude applicable taxes such as VAT, and late amounts may attract interest at the highest rate the law allows. We may pause work on overdue accounts after written notice.',
      ],
    },
    {
      title: 'AI staffing and rentals (ZYNIQ SYNTH)',
      paragraphs: [
        'AI agents or crews that we provide as a rental are made available for the term, scope and usage limits set in your order. They work inside your agreed environment and permissions. You are responsible for the tasks you assign them and for how you use their output. Availability depends on third-party model and infrastructure providers, and we do not promise uninterrupted operation unless the order includes a service level.',
      ],
    },
    {
      title: 'Acceptable use of the website',
      items: [
        'Do not break the law, infringe the rights of others, or submit false or misleading information.',
        'Do not send spam, malware or automated bulk submissions through our forms.',
        'Do not probe, scan or test the security of the website or try to gain unauthorised access to it or to the administration area. If you find a vulnerability, please tell us at ' + EMAIL + '.',
        'Do not copy, scrape or reverse engineer the website beyond what the law allows.',
      ],
    },
    {
      title: 'Third-party services',
      paragraphs: [
        'The website and our services rely on third parties such as hosting, database, font and AI model providers, and may link to external sites and social networks. We do not control them and are not responsible for their content or practices.',
      ],
    },
    {
      title: 'Disclaimers',
      paragraphs: [
        'The website is provided "as is" and "as available". To the fullest extent permitted by law we disclaim all implied warranties, including merchantability, fitness for a particular purpose and non-infringement. Warranties for paid work, if any, are only those written in the SOW.',
      ],
    },
    {
      title: 'Limitation of liability',
      paragraphs: [
        'To the fullest extent permitted by law, neither party is liable for indirect, incidental, special or consequential loss, or for loss of profit, revenue, goodwill or data. Our total liability arising from an engagement is limited to the fees you paid us for the services giving rise to the claim in the 12 months before the claim arose, and for use of the website alone is limited to AED 1,000.',
        'Nothing in these terms limits liability that cannot be limited by law, such as liability for fraud or wilful misconduct.',
      ],
    },
    {
      title: 'Indemnity',
      paragraphs: [
        'You will defend us against third-party claims caused by materials you provide or by your unlawful use of our deliverables, and cover the resulting losses and costs. We will do the same for claims that a deliverable we made for you, used as agreed, infringes a third party\'s intellectual property rights.',
      ],
    },
    {
      title: 'Suspension and termination',
      paragraphs: [
        'You may stop using the website at any time. Either party may end an engagement as the SOW provides, or for material breach that remains uncured 30 days after written notice. On termination you pay for work done up to that date. Sections that by their nature should continue, including intellectual property, confidentiality, liability and governing law, survive.',
      ],
    },
    {
      title: 'Governing law and disputes',
      paragraphs: [
        'These terms are governed by the laws of the Emirate of Dubai and the federal laws of the United Arab Emirates applicable there. We will first try to settle any dispute in good faith. If we cannot, the courts of Dubai have exclusive jurisdiction, unless the SOW chooses a different forum such as arbitration.',
      ],
    },
    {
      title: 'Changes to these terms',
      paragraphs: [
        'We may update these terms from time to time. The date at the top shows the latest version. Changes apply to your use of the website after they are posted and do not change an SOW already signed.',
      ],
    },
    {
      title: 'Contact',
      paragraphs: [`ZYNIQ Studio, Dubai, UAE. Email: ${EMAIL}.`],
    },
  ],
};

export const PRIVACY: LegalDoc = {
  path: '/privacy',
  title: 'Privacy Policy',
  updated: '18 October 2026',
  summary: 'What personal data we collect through this website, why we collect it, who handles it and the choices you have.',
  sections: [
    {
      title: 'Who we are',
      paragraphs: [
        `ZYNIQ Studio ("ZYNIQ", "we", "us") is an AI-driven software factory and innovation lab based in Dubai, United Arab Emirates. We are the controller of the personal data described in this policy. You can reach us at ${EMAIL}.`,
      ],
    },
    {
      title: 'What we collect',
      paragraphs: ['We keep what we collect to a minimum. We do not run visitor accounts, advertising trackers or analytics tools on this website.'],
      items: [
        'Consultation form: your first name, last name (optional), email address, the project brief you write, and, if you choose one, a preferred meeting time together with your browser\'s timezone.',
        'Emails: if you write to us, we keep your message and our replies.',
        'Technical data: our hosting provider processes your IP address, browser and device type, and the pages and files requested, in server and security logs.',
        'Browser storage: your light or dark theme choice (stored in your browser) and a note that you have already seen the intro screen in this session. These are not tracking cookies and are never sent to us.',
      ],
    },
    {
      title: 'How we use your data',
      items: [
        'To reply to your request, schedule a meeting and prepare a relevant proposal.',
        'To run and secure the website, and to prevent spam and abuse.',
        'To manage our relationship with you, including keeping a record of what we discussed.',
        'To meet legal and regulatory obligations and to establish or defend legal claims.',
      ],
    },
    {
      title: 'AI and your data',
      paragraphs: [
        'We do not use the content of your consultation request to train AI models. If an engagement involves AI tools processing your project data, we will agree this with you first in the statement of work, including which providers are involved and how the data is protected.',
      ],
    },
    {
      title: 'Our legal grounds',
      paragraphs: [
        'Where the law asks us to rely on a legal ground, we use: your consent when you submit the form and ask us to contact you; steps taken at your request before a possible contract; our legitimate interests in running a secure business and responding to enquiries; and legal obligation where it applies. We process personal data in line with the UAE Personal Data Protection Law (Federal Decree-Law No. 45 of 2021) and, for visitors in the European Economic Area and the United Kingdom, the GDPR.',
      ],
    },
    {
      title: 'Who we share it with',
      paragraphs: ['We do not sell personal data. We share it only with service providers that help us run the website, under agreements that limit how they can use it:'],
      items: [
        'Supabase, which hosts the database that stores consultation requests. Our project is hosted in the European Union (Frankfurt).',
        'Netlify, which hosts and delivers the website.',
        'Google Fonts, which delivers the typefaces on this site and therefore receives your IP address when the page loads.',
        'Email and calendar providers that we use to reply to you and confirm meetings.',
        'Professional advisers, auditors, and authorities, where we are legally required or need to protect our rights.',
      ],
    },
    {
      title: 'International transfers',
      paragraphs: [
        'Our providers may process data in countries other than the UAE, including the EU and the United States. Where data leaves your country we rely on appropriate safeguards, such as contractual protections, as the applicable law requires.',
      ],
    },
    {
      title: 'How long we keep it',
      paragraphs: [
        'We keep consultation requests for up to 24 months after our last contact with you, or for as long as an engagement and any legal limitation period requires, and then delete or anonymise them. Server logs are kept by our hosting provider for a short period for security. You can ask us to delete your request earlier.',
      ],
    },
    {
      title: 'How we protect it',
      paragraphs: [
        'Data is encrypted in transit. The database enforces access rules so that website visitors can submit a request but cannot read anyone else\'s, and only authorised ZYNIQ staff can sign in to view requests. No system is perfectly secure, so please avoid sending confidential or sensitive details in the form. If a breach affects your data we will notify you and the authorities as the law requires.',
      ],
    },
    {
      title: 'Your rights',
      paragraphs: ['Depending on where you live, you may have the right to:'],
      items: [
        'ask for a copy of the personal data we hold about you;',
        'have inaccurate data corrected, or have your data deleted;',
        'restrict or object to our use of your data, and ask for it in a portable format;',
        'withdraw consent at any time, without affecting what we did before you withdrew it;',
        'complain to the data protection authority where you live or work.',
      ],
    },
    {
      title: 'Exercising your rights',
      paragraphs: [`Email ${EMAIL} and tell us what you need. We may ask you to confirm your identity and will respond within the time the law allows, normally within 30 days.`],
    },
    {
      title: 'Children',
      paragraphs: ['This website is for businesses and is not directed at children. We do not knowingly collect personal data from anyone under 18. If you think a child has sent us data, please tell us and we will delete it.'],
    },
    {
      title: 'Links to other sites',
      paragraphs: ['Our footer links to social networks and other sites. They have their own privacy practices, which we do not control. Please read their policies before sharing data with them.'],
    },
    {
      title: 'Changes to this policy',
      paragraphs: ['We may update this policy when our practices or the law change. The date at the top shows the latest version, and we will point out material changes on the website.'],
    },
    {
      title: 'Contact',
      paragraphs: [`ZYNIQ Studio, Dubai, UAE. Email: ${EMAIL}.`],
    },
  ],
};
