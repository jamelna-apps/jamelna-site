'use client'

import type { SecuritySignals } from './types'

const BOT_UA = /bot|crawl|spider|headless|phantom|selenium|puppeteer|playwright|wget|curl|scrapy|python-requests|go-http-client|ahrefsbot|semrushbot|dotbot|mj12bot/i

export function collectSecuritySignals(): SecuritySignals {
  const ua = navigator.userAgent
  const webdriver = !!(navigator as any).webdriver
  const pluginCount = navigator.plugins?.length ?? 0
  const hasChrome = !!(window as any).chrome
  const screenConsistent =
    screen.width > 0 && screen.height > 0 &&
    screen.width <= 7680 && screen.height <= 4320
  const touchSupport = 'ontouchstart' in window || navigator.maxTouchPoints > 0
  const isBot = BOT_UA.test(ua) || webdriver

  return { isBot, webdriver, pluginCount, hasChrome, screenConsistent, touchSupport }
}
