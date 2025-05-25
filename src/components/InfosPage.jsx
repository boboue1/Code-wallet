import styled from 'styled-components';

const PageContainer = styled.div`
  padding: 30px;
  max-width: 800px;
  margin: auto;
  color: #474242;
  line-height: 1.6;
`;

const Section = styled.section`
  margin-bottom: 40px;
`;

const Title = styled.h2`
  font-size: 1.8rem;
  margin-bottom: 16px;
  color: #00bfff;
`;

const Paragraph = styled.p`
  margin-bottom: 12px;
`;

function InfoPage() {
  return (
    <PageContainer>
      <Section>
        <Title>Application Features</Title>
        <Paragraph>
          <strong>Code Wallet</strong> is a desktop application designed to help developers organize, manage, and retrieve reusable code snippets with ease. It supports:
        </Paragraph>
        <ul>
          <li> Save code snippets with title, tags, and programming language</li>
          <li> Search and filter by tags or keywords</li>
          <li>Light/Dark mode toggle</li>
          <li>Quick preview in modal with copy-to-clipboard</li>
          <li> Tag management system</li>
          <li> Local storage and optional Firebase cloud sync</li>
          <li> Syntax highlighting for multiple languages</li>
        </ul>
      </Section>

      <Section>
        <Title> About the Developer</Title>
        <Paragraph>
          This application was developed by a passionate software developer focused on building efficient, user-friendly tools for coders.
        </Paragraph>
        <Paragraph>
          Main technologies used include <strong>React</strong>, <strong>Styled-Components</strong>, and <strong>Electron</strong>. Firebase is optionally used for syncing data across devices.
        </Paragraph>
        <Paragraph>
          Feel free to contribute, report issues, or suggest improvements via GitHub or by contacting the developer directly.
        </Paragraph>
      </Section>

      <Section>
        <Title> Data & Legal Notice</Title>
        <Paragraph>
          Code Wallet stores data locally on your device. If you opt into cloud syncing via Firebase, your snippets are securely stored in Firestore.
        </Paragraph>
        <Paragraph>
          <strong>Privacy:</strong> No personal data is collected or shared. Snippets are only accessible to you.
        </Paragraph>
        <Paragraph>
          <strong>Data Usage:</strong> All data is strictly used for functionality purposes. We do not sell, analyze, or expose your code.
        </Paragraph>
        <Paragraph>
          <strong>Disclaimer:</strong> This app is provided "as is" without any warranties. Please ensure your backups if using locally stored data only.
        </Paragraph>
        <Paragraph>
          For questions about data use or your rights under GDPR or other privacy regulations, contact the developer directly.
        </Paragraph>
      </Section>
    </PageContainer>
  );
}

export default InfoPage;
