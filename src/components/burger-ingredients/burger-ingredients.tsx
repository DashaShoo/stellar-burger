import React, { FC, useState, useRef, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { useSelector } from '../../services/store';

import { TTabMode } from '@utils-types';
import { BurgerIngredientsUI } from '../ui/burger-ingredients';

export const BurgerIngredients: FC = () => {
  const ingredients = useSelector(state => state.ingredients.items);

  const buns = ingredients.filter(ing => ing.type === 'bun');
  const sauces = ingredients.filter(ing => ing.type === 'sauce');
  const mains = ingredients.filter(ing => ing.type === 'main');

  const [activeTab, setActiveTab] = useState<TTabMode>('bun');

  const bunTitleRef = useRef<HTMLHeadingElement>(null);
  const mainTitleRef = useRef<HTMLHeadingElement>(null);
  const sauceTitleRef = useRef<HTMLHeadingElement>(null);

  const [bunsRef, bunsInView] = useInView({ threshold: 0 });
  const [mainsRef, mainsInView] = useInView({ threshold: 0 });
  const [saucesRef, saucesInView] = useInView({ threshold: 0 });

  useEffect(() => {
    if (bunsInView) {
      setActiveTab('bun');
    } else if (saucesInView) {
      setActiveTab('sauce');
    } else if (mainsInView) {
      setActiveTab('main');
    }
  }, [bunsInView, mainsInView, saucesInView]);

  const onTabClick = (tab: string) => {
    setActiveTab(tab as TTabMode);

    switch (tab) {
      case 'bun':
        bunTitleRef.current?.scrollIntoView({ behavior: 'smooth' });
        break;
      case 'main':
        mainTitleRef.current?.scrollIntoView({ behavior: 'smooth' });
        break;
      case 'sauce':
        sauceTitleRef.current?.scrollIntoView({ behavior: 'smooth' });
        break;
    }
  };

  return (
    <BurgerIngredientsUI
      currentTab={activeTab}
      buns={buns}
      mains={mains}
      sauces={sauces}
      titleBunRef={bunTitleRef}
      titleMainRef={mainTitleRef}
      titleSaucesRef={sauceTitleRef}
      bunsRef={bunsRef}
      mainsRef={mainsRef}
      saucesRef={saucesRef}
      onTabClick={onTabClick}
    />
  );
};
