import { useEffect, useRef, useState } from 'react';
import Content from '../../../components/layout/Content';
import Button from '../../../components/shared/Button';
import Photo from '../../../components/shared/Photo';
import Textarea from '../../../components/shared/Textarea';

import './NewTweetPage.css';
import { createTweet } from '../service';
import { useNavigate } from 'react-router';

const MIN_CHARACTERS = 5;
const MAX_CHARACTERS = 140;

function NewTweetPage() {
  const [content, setContent] = useState('');
  const [isFetching, setIsFetching] = useState(false);
  const navigate = useNavigate();
  const counterRef = useRef(0);
  const formRef = useRef(null);
  const divRef = useRef(null);
  const textareaRef = useRef(null);

  // { current: null }

  useEffect(() => {
    counterRef.current++;
  });

  useEffect(() => {
    console.log(formRef);
  }, []);

  useEffect(() => {
    console.log('textarea', textareaRef);
    textareaRef.current.focus();
  });

  const handleChange = event => {
    setContent(event.target.value);
  };

  const handleSubmit = async event => {
    event.preventDefault();
    try {
      setIsFetching(true);
      const tweet = await createTweet({ content });
      navigate(`../${tweet.id}`, { relative: 'path' });
    } catch (error) {
      if (error.status === 401) {
        navigate('/login');
      } else {
        setIsFetching(false);
        // Show error
      }
    }
  };

  const characters = `${content.length} / ${MAX_CHARACTERS}`;
  const buttonDisabled = content.length <= MIN_CHARACTERS || isFetching;

  return (
    <Content title="What are you thinking?">
      <div
        className="newTweetPage"
        ref={element => {
          console.log(element);
          divRef.current = element;
        }}
      >
        <div className="left">
          <Photo />
        </div>
        <div className="right">
          <form onSubmit={handleSubmit} ref={formRef}>
            <Textarea
              className="newTweetPage-textarea"
              placeholder="Hey! What's up!"
              value={content}
              onChange={handleChange}
              maxLength={MAX_CHARACTERS}
              ref={textareaRef}
            />
            <div className="newTweetPage-footer">
              <span className="newTweetPage-characters">{characters}</span>
              <Button
                type="submit"
                className="newTweetPage-submit"
                $variant="primary"
                disabled={buttonDisabled}
              >
                Let's go!
              </Button>
            </div>
          </form>
        </div>
      </div>
    </Content>
  );
}

export default NewTweetPage;
