export type Observer<T> = (value: T) => void

type SubjectValue<T> = T extends object
    ? {
          [K in keyof T]: T[K] extends AbstractSubject<infer U> ? U : T[K]
      }
    : T

abstract class AbstractSubject<T> {
    abstract subscribe(observer: Observer<SubjectValue<T>>): void
    abstract unsubscribe(observer: Observer<SubjectValue<T>>): void
    abstract get value(): SubjectValue<T>
}

export class Subject<T> extends AbstractSubject<T> {
    private observers: Observer<SubjectValue<T>>[] = []
    private _value: SubjectValue<T>

    private _unpackValue(value: T): SubjectValue<T> {
        if (typeof value === 'object') {
            return Object.fromEntries(
                Object.entries(value as object).map(([key, value]) => {
                    if (value instanceof AbstractSubject) {
                        return [key, value.value]
                    }
                    return [key, value]
                }),
            ) as SubjectValue<T>
        }
        return value as SubjectValue<T>
    }

    constructor(initialValue: T) {
        super()
        this._value = this._unpackValue(initialValue)

        // Subscribe to any Subject values in the initial value
        // This allows us to create sub-subjects and have them update the parent subject
        if (typeof initialValue === 'object') {
            Object.entries(initialValue as object)
                .filter(([, value]) => value instanceof AbstractSubject)
                .forEach(([key, nestedSubject]) => {
                    ;(nestedSubject as AbstractSubject<any>).subscribe((newValue) => {
                        this.value = {
                            ...this.value,
                            [key]: newValue,
                        }
                    })
                })
        }
    }

    subscribe(observer: Observer<SubjectValue<T>>) {
        this.observers.push(observer)
    }

    unsubscribe(observer: Observer<SubjectValue<T>>) {
        this.observers = this.observers.filter((obs) => obs !== observer)
    }

    get value() {
        return this._value
    }

    set value(value: SubjectValue<T>) {
        this._value = value
        this.observers.forEach((observer) => observer(value))
    }

    getReadOnlySubject() {
        return new ReadOnlySubject(this)
    }
}

export class ReadOnlySubject<T> extends AbstractSubject<T> {
    constructor(private subject: Subject<T>) {
        super()
    }

    subscribe(observer: Observer<SubjectValue<T>>) {
        this.subject.subscribe(observer)
    }

    unsubscribe(observer: Observer<SubjectValue<T>>) {
        this.subject.unsubscribe(observer)
    }

    get value() {
        return this.subject.value
    }
}
