import { expect, it, describe, mock } from 'bun:test'
import { Subject } from './Subject'

describe('Subject', () => {
    it('should notify observers when value changes', () => {
        const subject = new Subject(0)
        const observer = mock()
        subject.subscribe(observer)

        subject.value = 1

        expect(observer).toHaveBeenCalledWith(1)
    })

    it('should not notify unsubscribed observers', () => {
        const subject = new Subject(0)
        const observer = mock()
        subject.subscribe(observer)
        subject.unsubscribe(observer)

        subject.value = 1

        expect(observer).not.toHaveBeenCalled()
    })

    it('should return the current value', () => {
        const subject = new Subject(0)
        expect(subject.value).toBe(0)
    })

    it('should return a read-only subject', () => {
        const subject = new Subject(0)
        const readOnlySubject = subject.getReadOnlySubject()
        expect(readOnlySubject.value).toBe(0)
    })

    it('should notify observers of a read-only subject', () => {
        const subject = new Subject(0)
        const readOnlySubject = subject.getReadOnlySubject()
        const observer = mock()
        readOnlySubject.subscribe(observer)

        subject.value = 1

        expect(observer).toHaveBeenCalledWith(1)
    })

    it('should not notify unsubscribed observers of a read-only subject', () => {
        const subject = new Subject(0)
        const readOnlySubject = subject.getReadOnlySubject()
        const observer = mock()
        readOnlySubject.subscribe(observer)
        readOnlySubject.unsubscribe(observer)

        subject.value = 1

        expect(observer).not.toHaveBeenCalled()
    })

    it('should notify observers of a nested subject', () => {
        const subSubject = new Subject(0)
        const subject = new Subject({ nested: subSubject })
        const observer = mock()
        subject.subscribe(observer)

        subSubject.value = 1

        expect(observer).toHaveBeenCalledWith({ nested: 1 })
    })

    it('should not notify unsubscribed observers of a nested subject', () => {
        const subSubject = new Subject(0)
        const subject = new Subject({ nested: subSubject })
        const observer = mock()
        subject.subscribe(observer)
        subject.unsubscribe(observer)

        subSubject.value = 1

        expect(observer).not.toHaveBeenCalled()
    })

    it('should notify observers of a nested read-only subject', () => {
        const subSubject = new Subject(0)
        const subject = new Subject({ nested: subSubject })
        const readOnlySubject = subject.getReadOnlySubject()
        const observer = mock()
        readOnlySubject.subscribe(observer)

        subSubject.value = 1

        expect(observer).toHaveBeenCalledWith({ nested: 1 })
    })

    it('should not notify unsubscribed observers of a nested read-only subject', () => {
        const subSubject = new Subject(0)
        const subject = new Subject({ nested: subSubject })
        const readOnlySubject = subject.getReadOnlySubject()
        const observer = mock()
        readOnlySubject.subscribe(observer)
        readOnlySubject.unsubscribe(observer)

        subSubject.value = 1

        expect(observer).not.toHaveBeenCalled()
    })

    it('should notify observers of changes in a nested read-only subject', () => {
        const subSubject = new Subject(0)
        const subject = new Subject({ nested: subSubject.getReadOnlySubject() })
        const observer = mock()
        subject.subscribe(observer)

        subSubject.value = 1

        expect(observer).toHaveBeenCalledWith({ nested: 1 })
    })

    it('should not notify unsubscribed observers of changes in a nested read-only subject', () => {
        const subSubject = new Subject(0)
        const subject = new Subject({ nested: subSubject.getReadOnlySubject() })
        const observer = mock()
        subject.subscribe(observer)
        subject.unsubscribe(observer)

        subSubject.value = 1

        expect(observer).not.toHaveBeenCalled()
    })
})
