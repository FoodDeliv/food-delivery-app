import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TranslationService {
  // По умолчанию ставим русский или казахский
  private currentLang = new BehaviorSubject<string>('en');
  currentLang$ = this.currentLang.asObservable();

  private data: any = {
    en: {
      title_login: 'Sign In',
      title_signup: 'Sign Up',
      subtitle: 'Favorite food from restaurants in the city',
      username: 'Username',
      password: 'Password',
      forgot: 'Forgot password?',
      no_account: "Don't have an account?",
      have_account: "Already have an account?"
    },
    ru: {
      title_login: 'Войти',
      title_signup: 'Регистрация',
      subtitle: 'Любимая еда из ресторанов города',
      username: 'Имя пользователя',
      password: 'Пароль',
      forgot: 'Забыли пароль?',
      no_account: "Нет аккаунта?",
      have_account: "Уже есть аккаунт?"
    },
    kz: {
      title_login: 'Кіру',
      title_signup: 'Тіркелу',
      subtitle: 'Қаладағы мейрамханалардан сүйікті тағамдар',
      username: 'Пайдаланушы аты',
      password: 'Құпия сөз',
      forgot: 'Құпия сөзді ұмыттыңыз ба?',
      no_account: "Аккаунт жоқ па?",
      have_account: "Аккаунт бар ма?"
    }
  };

  setLanguage(lang: string) {
    this.currentLang.next(lang);
  }

  translate(key: string): string {
    return this.data[this.currentLang.value][key] || key;
  }
}