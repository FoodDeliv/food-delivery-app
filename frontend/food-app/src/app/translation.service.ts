import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TranslationService {
  private currentLang = new BehaviorSubject<string>('en');
  currentLang$ = this.currentLang.asObservable();

  get currentLangValue(): string {
    return this.currentLang.value;
  }

  private data: any = {
    en: {
      // Login Page
      title_login: 'Sign In',
      title_signup: 'Sign Up',
      subtitle: 'Favorite food from restaurants in the city',
      username: 'Username',
      password: 'Password',
      forgot: 'Forgot password?',
      no_account: "Don't have an account?",
      have_account: "Already have an account?",
      // Navbar
      search_placeholder: 'Find in Deli',
      sign_out: 'Sign Out',
      reset_msg: 'Instructions have been sent to your email!',
      err_user_exists: 'User with this username already exists',
      err_invalid_creds: 'Invalid username or password',
      auth_success_msg: 'Account created! Please sign in.',
      err_unknown: 'Something went wrong'
    },
    ru: {
      // Login Page
      title_login: 'Войти',
      title_signup: 'Регистрация',
      subtitle: 'Любимая еда из ресторанов города',
      username: 'Имя пользователя',
      password: 'Пароль',
      forgot: 'Забыли пароль?',
      no_account: "Нет аккаунта?",
      have_account: "Уже есть аккаунт?",
      // Navbar
      search_placeholder: 'Найти в Deli',
      sign_out: 'Выйти',
      reset_msg: 'Инструкции отправлены на вашу почту!',
      err_user_exists: 'Пользователь с таким именем уже существует',
      err_invalid_creds: 'Неверное имя пользователя или пароль',
      err_unknown: 'Что-то пошло не так',
      auth_success_msg: 'Аккаунт создан! Теперь можно войти.',

    },
    kz: {
      // Login Page
      title_login: 'Кіру',
      title_signup: 'Тіркелу',
      subtitle: 'Қаладағы мейрамханалардан сүйікті тағамдар',
      username: 'Пайдаланушы аты',
      password: 'Құпия сөз',
      forgot: 'Құпия сөзді ұмыттыңыз ба?',
      no_account: "Аккаунт жоқ па?",
      have_account: "Аккаунт бар ма?",
      // Navbar
      search_placeholder: 'Deli-ден іздеу',
      sign_out: 'Шығу',
      reset_msg: 'Нұсқаулықтар поштаңызға жіберілді!',
      err_user_exists: 'Бұл пайдаланушы аты бос емес',
      err_invalid_creds: 'Пайдаланушы аты немесе құпия сөз қате',
      err_unknown: 'Қате орын алды',
      auth_success_msg: 'Тіркелу сәтті аяқталды! Енді жүйеге кіріңіз.',
    }
  };

  setLanguage(lang: string) {
    console.log('Switching language to:', lang);
    this.currentLang.next(lang);
  }

  translate(key: string): string {
    const lang = this.currentLangValue;
    return this.data[lang][key] || key;
  }
}