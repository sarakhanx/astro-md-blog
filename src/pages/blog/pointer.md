---
author: Whale-hundrid
title: pointer-in-go-lang
description: อธิบาย pointer แบบง่ายๆ ว่าอะไร point ไปไหน ได้อะไร
layout: ../../layouts/BlogPost.astro
date: 2024-11-28
slug: "pointer"
---
## อธิบาย Pointer

| Name  | Value | Address | Additional Mappings                              |
| ----- | ----- | ------- | ------------------------------------------------ |
| `a`   | 1     | 100     | `a -> 1`                                         |
| `*b`  | 100   | 304     | `*b -> 1`, `b -> 100`, `&b -> 304`               |
| `**c` | 304   | 208     | `*c -> 100`, `c -> 304`, `&c -> 208`, `**c -> 1` |

### **ตัวแปรแต่ละตัว:**

1. **`a`**

    - กล่องชื่อ `a` ใส่เลข **1** อยู่ข้างใน
    - และ `a` ถูกเก็บไว้ในที่อยู่ (address) หมายเลข **100**
2. **`*b`**

    - กล่อง `b` เป็นกล่องที่ไม่ได้ใส่ค่าโดยตรง แต่เก็บ "ที่อยู่ของกล่อง `a`" ซึ่งก็คือ **100**
    - และตัวกล่อง `b` นี้เองอยู่ที่ address หมายเลข **304**
3. **`**c`**

    - กล่อง `c` เป็นกล่องที่เก็บ "ที่อยู่ของกล่อง `b`" ซึ่งก็คือ **304**
    - และกล่อง `c` เองอยู่ที่ address หมายเลข **208**

---

### **ความสัมพันธ์ระหว่างตัวแปร:**

- **`a -> 1`**  
    หมายความว่า เมื่อเราเปิดกล่อง `a` เราจะเจอเลข **1**

- **`*b -> 1`**  
    เพราะ `b` เก็บที่อยู่ของ `a` ไว้ ดังนั้นเมื่อเราเปิด `b` (ดูที่อยู่ 100) จะเจอเลข **1** ใน `a`

- **`**c -> 1`**  
    เพราะ `c` เก็บที่อยู่ของ `b` ไว้ (304) และ `b` ชี้ไปที่ `a` ดังนั้น `**c` ก็ชี้ไปถึงเลข **1** เช่นกัน


---

### **เปรียบเทียบง่ายๆ:**

- `a` เหมือน "กล่องใส่ค่าจริงๆ" (1)
- `b` เหมือน "แผนที่บอกตำแหน่งของกล่อง `a`"
- `c` เหมือน "แผนที่ที่บอกตำแหน่งของแผนที่ `b`"

ดังนั้น `**c` ก็สามารถย้อนกลับไปหาค่าใน `a` ได้ครับ! 😊