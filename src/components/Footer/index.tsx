import { GithubOutlined } from '@ant-design/icons';
import { DefaultFooter } from '@ant-design/pro-components';
import {GITHUB_LINK, PLANET_LINK} from "@/constants";
const Footer: React.FC = () => {
  const defaultMessage = 'Benny 出品';
  const currentYear = new Date().getFullYear();
  return (
    <DefaultFooter
      copyright={`${currentYear} ${defaultMessage}`}
      links={[
        {
          key: 'CodeNav',
          title: '编程导航',
          href: PLANET_LINK,
          blankTarget: true,
        },
        {
          key: 'github',
          title: <><GithubOutlined /> GitHub</>,
          href: GITHUB_LINK,
          blankTarget: true,
        },
        {
          key: 'Ant Design',
          title: 'Ant Design',
          href: 'https://ant.design',
          blankTarget: true,
        },
      ]}
    />
  );
};
export default Footer;
