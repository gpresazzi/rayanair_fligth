#!/usr/bin/env python3

from selenium import webdriver
from selenium.webdriver.common.keys import Keys


def main():
    browser = webdriver.Firefox()
    browser.get('https://www.ryanair.com/us/en/')
    content = browser.page_source
    print(content)
    print("Ryanair search flight application.")


if __name__ == "__main__":
    main()

