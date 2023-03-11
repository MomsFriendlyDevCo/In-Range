@MomsFriendlyDevCo/In-Range
===========================
Numeric range checking.

```javascript
import inRange from '@momsfriendlydevco/in-range';

// All of the following evaluate to true
inRange(10, '10')
inRange(10, '=10')
inRange(10, '>9')
inRange(10, '>=10')
inRange(10, '<12')
inRange(10, '<=12')
inRange(10, '9+') // i.e. ">="
inRange(10, '5-20')

// Can also be used in CSV combinations
inRange(10, '1, 2-5, 9+');
```
