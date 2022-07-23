> DEPRECATED: Use @hammerhq/localization
>
> ~barbarbar338

# ✨ Locale Parser by barbarbar338
- This is a YAML based localisation system that will make your job quite easy
- Just create your language folder and seperate everything in files
- Set your constants in `constants.yaml` and apply to everything

# 💡 Example
```js
import { I18n } from "locale-parser";

/*
    options:
        directory?: string;
        defaultLocale: string;
*/
const parser = new I18n({ 
    defaultLocale: "en" 
});

parser.getLocales(); // => [ "en", "tr" ];
parser.getConstant(); // => all constants;
parser.getConstant("owner"); // => "owner" constant;
parser.toJSON(); // => all language data in an object
parser.toJSON({ arg: "this is an argument"}); // => all language data in an object with argument replaced

parser.get("en", "info", "test"); // "test" string in "info" section in "en" folder
parser.get("tr", "messages", "message", { arg: "this is an argument"}); // "message" string in "messages" section in "tr" folder with "arg" argument
```

# 📝 File Structure

### `locales/constants.yaml` example
```yaml
owner: barbarbar338
site: "https://barbarbar338.fly.dev/"
anotherConstant: this is a constant
```

### `locales/{locale}/{section}.yaml` example
```yaml
withConstant: this string uses %{owner} constant
withArgs: this string uses %{argument} argument and %{anotherArgument} argument
withConstantsAndArguments: this string uses %{simpleArgument} argument and %{site} constant
```

# 📁 Folder Structure
```
📂 locales/
├─── 📝 constants.yaml
├─── 📂 en
│    ├─── 📝 info.yaml
│    ├─── 📝 messages.yaml
│    └─── 📝 test.yaml
└─── 📂 tr
     ├─── 📝 info.yaml
     ├─── 📝 messages.yaml
     └─── 📝 test.yaml

```
