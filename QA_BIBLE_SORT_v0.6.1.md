# QA — Bible Sort v0.6.1

Root fix only: `src/services/bible-reference.js`.

Expected order is strictly:
1. canonical 66-book index
2. numeric chapter
3. numeric verse

Regression lock:
- all Matthew references sort before every Mark reference
- Matthew 3:28, 3:31, 4:7, 10:32, 22:37-39 sort numerically
- Mark 3:28-29, 3:31, 4:22 remain after all Matthew references
- Chinese numerals such as 马太福音二十二章37节 are parsed numerically
- zero-width / compatibility Unicode characters are normalized before parsing
