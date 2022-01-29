import {
  Heading,
  Pane,
  Paragraph,
  Link,
  UnorderedList,
  ListItem,
} from 'evergreen-ui';

export function CookiePolicy() {
  return (
    <Pane padding="1em">
      <Heading size="800">Cookie Policy for SNS Manager</Heading>

      <Paragraph>
        This is the Cookie Policy for SNS Manager, accessible from
        https://sns-manager.herokuapp.com/
      </Paragraph>

      <Heading marginY="1em">What Are Cookies</Heading>

      <Paragraph>
        As is common practice with almost all professional websites this site
        uses cookies, which are tiny files that are downloaded to your computer,
        to improve your experience. This page describes what information they
        gather, how we use it and why we sometimes need to store these cookies.
        We will also share how you can prevent these cookies from being stored
        however this may downgrade or 'break' certain elements of the sites
        functionality.
      </Paragraph>

      <Heading marginY="1em">How We Use Cookies</Heading>

      <Paragraph>
        We use cookies for a variety of reasons detailed below. Unfortunately in
        most cases there are no industry standard options for disabling cookies
        without completely disabling the functionality and features they add to
        this site. It is recommended that you leave on all cookies if you are
        not sure whether you need them or not in case they are used to provide a
        service that you use.
      </Paragraph>

      <Heading marginY="1em">Disabling Cookies</Heading>

      <Paragraph>
        You can prevent the setting of cookies by adjusting the settings on your
        browser (see your browser Help for how to do this). Be aware that
        disabling cookies will affect the functionality of this and many other
        websites that you visit. Disabling cookies will usually result in also
        disabling certain functionality and features of the this site. Therefore
        it is recommended that you do not disable cookies. This Cookies Policy
        was created with the help of the{' '}
        <Link
          padding="0"
          href="https://www.cookiepolicygenerator.com/cookie-policy-generator/"
        >
          Cookies Policy Generator from CookiePolicyGenerator.com
        </Link>
        .
      </Paragraph>

      <Heading marginY="1em">The Cookies We Set</Heading>

      <UnorderedList>
        <ListItem>
          <Paragraph>Login related cookies</Paragraph>
          <Paragraph>
            We use cookies when you are logged in so that we can remember this
            fact. This prevents you from having to log in every single time you
            visit a new page. These cookies are typically removed or cleared
            when you log out to ensure that you can only access restricted
            features and areas when logged in.
          </Paragraph>
        </ListItem>
      </UnorderedList>

      <Heading marginY="1em">Third Party Cookies</Heading>

      <Paragraph>
        In some special cases we also use cookies provided by trusted third
        parties. The following section details which third party cookies you
        might encounter through this site.
      </Paragraph>

      <UnorderedList>
        <ListItem>
          <Paragraph>
            The Google AdSense service we use to serve advertising uses a
            DoubleClick cookie to serve more relevant ads across the web and
            limit the number of times that a given ad is shown to you.
          </Paragraph>
          <Paragraph>
            For more information on Google AdSense see the official Google
            AdSense privacy FAQ.
          </Paragraph>
        </ListItem>
      </UnorderedList>

      <Heading>More Information</Heading>

      <Paragraph>
        Hopefully that has clarified things for you and as was previously
        mentioned if there is something that you aren't sure whether you need or
        not it's usually safer to leave cookies enabled in case it does interact
        with one of the features you use on our site.
      </Paragraph>

      <Paragraph>
        For more general information on cookies, please read{' '}
        <Link
          padding="0"
          href="https://www.generateprivacypolicy.com/#cookies"
        >
          "Cookies" article from the Privacy Policy Generator
        </Link>
        .
      </Paragraph>

      <Paragraph>
        However if you are still looking for more information then you can
        contact us through one of our preferred contact methods:
      </Paragraph>

      <UnorderedList>
        <ListItem>Email: sakkaku.dev@gmail.com</ListItem>
      </UnorderedList>
    </Pane>
  );
}
