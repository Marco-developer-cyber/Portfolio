import { Howl } from 'howler';

export default function useSwordSound() {
  const sounds = [
    new Howl({ src: ['/sounds/sword1.mp3'] }),
    new Howl({ src: ['/sounds/sword2.mp3'] })
  ];

  const play = () => {
    const sound = sounds[Math.floor(Math.random() * sounds.length)];
    sound.play();
  };

  return play;
}